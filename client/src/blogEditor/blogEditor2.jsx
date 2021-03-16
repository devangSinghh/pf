import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
// import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';

import axios, { base } from '../axios-pf';

class BlogEditor2 extends Component {

    // saveEditorContent = async() => {
    //     const payload = { blogEditorContent : convertedContent }
  
    //     const { data : res } = await axios.post(`update-blog/save-editor-content/${props.blogId}`, payload)
    //     console.log(res)
    // }

    editorConfiguration = {
        toolbar: {
            items: [
                'heading', '|',
                'alignment', '|',
                'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
                'link', '|',
                'bulletedList', 'numberedList', 'todoList',
                '-', // break point
                'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor', '|',
                'code', 'codeBlock', '|',
                'insertTable', '|',
                'outdent', 'indent', '|',
                'uploadImage', 'blockQuote', '|',
                'undo', 'redo'
            ],
            // plugins: [ Underline ],
            shouldNotGroupWhenFull: true
        }
    };

    render() {
        return (
            <div className="App">
                <h2>Using CKEditor 5 build in React</h2>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    config = {
                        {
                            ckfinder :{
                                uploadUrl : base + `update-blog/upload-blog-content/rsk`
                            }
                        }
                        // this.editorConfiguration
                    }

                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
    }
}

export default BlogEditor2;