import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import axios, {base} from '../axios-pf';

const BlogEditor = props => {

  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = html => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  const saveEditorContent = async() => {
      const payload = { blogEditorContent : draftToHtml(convertToRaw(editorState.getCurrentContent())) }

      const { data : res } = await axios.post(`update-blog/save-editor-content/${props.blogId}`, payload)
      console.log(res)
  }

  return (
    <div className="">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <div className="preview" dangerouslySetInnerHTML={{__html: `${draftToHtml(convertToRaw(editorState.getCurrentContent()))}`}}></div>

      <button onClick={saveEditorContent}>Save</button>
    </div>
  )
}
export default BlogEditor;