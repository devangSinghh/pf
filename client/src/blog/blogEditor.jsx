import React, { useState, useEffect } from 'react'
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import { convertToHTML } from 'draft-convert'
import draftToHtml from "draftjs-to-html"
import DOMPurify from 'dompurify'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {stateFromHTML} from 'draft-js-import-html'
import Button from '@material-ui/core/Button'

import axios, {base} from '../axios-pf'

const BlogEditor = props => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(async() => {
    const { data:blog } = await axios.get(base + `devblog/${props.blogName}/`)
    if (blog.body !== undefined)
    setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(blog.body))))
  }, [])

  const handleEditorChange = state => {
    setEditorState(state);
    convertContentToHTML();
  }

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  
  const saveEditorContent = async(e, route, id) => {
      const payload = { 
        blogEditorContent : draftToHtml(convertToRaw(editorState.getCurrentContent())) ,
        blogName : props.blogName
      }

      const { data : res } = await axios.post(route + `${id}`, payload)
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
        editorStyle = {{ height :"60vh"}}
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

      <Button variant="contained" color="primary" className="mb-4" onClick={e => saveEditorContent(e, props.route, props.blogId)}>Save</Button>
    </div>
  )
}
export default BlogEditor;