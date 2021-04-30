import React, { useState, useEffect } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import draftToHtml from "draftjs-to-html";
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import axios, {base} from '../axios-pf';

const BlogEditor = props => {

  const [savedContent, setSavedContent] = useState("")

  const [editorState, setEditorState] = useState(EditorState.createEmpty(), )
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(async() => {
    const { data:blog } = await axios.get(base + `blog/${props.blogName}/`)
    // const editorState = await EditorState.createWithContent(convertFromRaw(blog === undefined ? "" : blog.blogEditorContent))
    // setEditorState(editorState)
  }, [])

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  
  const saveEditorContent = async() => {
      const payload = { blogEditorContent : draftToHtml(convertToRaw(editorState.getCurrentContent())) }

      const { data : res } = await axios.post(`update-blog/save-editor-content/${props.blogId}`, payload)
      console.log(res)
  }

  const uploadCallback = file => {
    return new Promise(
        (resolve, reject) => {
            if (file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    resolve({ data: { link: e.target.result } })
                };
                reader.readAsDataURL(file);
            }
        }
    );
}

  return (
    <div className="">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        placeholder="Write your content here"
        editorStyle = {{ height :"90vh" }}
       mention={{
      separator: ' ',
      trigger: '@',
      suggestions: [
        { text: 'APPLE', value: 'apple', url: 'apple' },
        { text: 'BANANA', value: 'banana', url: 'banana' },
        { text: 'CHERRY', value: 'cherry', url: 'cherry' },
        { text: 'DURIAN', value: 'durian', url: 'durian' },
        { text: 'EGGFRUIT', value: 'eggfruit', url: 'eggfruit' },
        { text: 'FIG', value: 'fig', url: 'fig' },
        { text: 'GRAPEFRUIT', value: 'grapefruit', url: 'grapefruit' },
        { text: 'HONEYDEW', value: 'honeydew', url: 'honeydew' },
      ],
    }}
    hashtag={{}}
      />
      <div className="preview" dangerouslySetInnerHTML={{__html: `${draftToHtml(convertToRaw(editorState.getCurrentContent()))}`}}></div>

      <button className="blog-editor-content-save-button" onClick={saveEditorContent}>Save</button>
    </div>
  )
}
export default BlogEditor;