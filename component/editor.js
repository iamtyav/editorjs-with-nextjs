import React, { useEffect } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import edjsHTML from 'editorjs-html'

function simpleImageParser(block){
  return `<figure class="kg-card kg-image-card"><img src=${block.data.url}"class="kg-image" alt loading="lazy"></figure>`;
}

let editor
let titleEditor
let featuredImageEditor

const Editor = ({ data, url, method, isEdit }) => {
  const [preview, setPreview] = React.useState(!isEdit)
  // const [editor, setEditor] = React.useState(null)
  // const [titleEditor, setTitleEditor] = React.useState(null)
  // const [featuredImageEditor, setFeaturedImageEditor] = React.useState(null)
  const [sampleData, setSampleData] = React.useState(data?.html || "")
  useEffect(() => {
    if (typeof window != 'undefined' && editor == undefined && titleEditor == undefined && featuredImageEditor == undefined ) {
      const EDITOR_JS_TOOLS = {

        embed: Embed,
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
        marker: Marker,
        list: List,
        warning: Warning,
        code: Code,
        linkTool: LinkTool,
        image: {
          class:Image,
          config: {
            types: "image/*",
          }
        
        },
        raw: Raw,

        quote: Quote,
        checklist: CheckList,
        delimiter: Delimiter,
        inlineCode: InlineCode,
        simpleImage: {
          class: SimpleImage,
          inlineToolbar: true
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },        
        header: {
          class:Header,
          config: {
            placeholder: "Title",
          },
          inlineToolbar: true
        },
      }
      editor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: "codex-editor",
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
      
        tools: EDITOR_JS_TOOLS,


        minHeight: 5,

        // autofocus: true,
        /**
         * onReady callback
         */
        onReady: () => {
          console.log("Editor.js is ready to work!");
        },
        /**
         * This Tool will be used as default
         */
        placeholder: "Lets get some blogs running!",

        // data: {
        //   blocks: [
        //     {
        //       type: "header",
        //       data: ""
        //     }
        //   ],
        //   version: "2.11.10"
        // },
        // placeholder: "Sometext",

        readOnly: preview
      });
      titleEditor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: "title",

        minHeight: 50,
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
      
        tools: {
          header: {
            class:Header,
            config: {
              placeholder: "Title",
            },
            inlineToolbar: true
          }
        },

        // autofocus: true,
        /**
         * onReady callback
         */
        onReady: () => {
          console.log("Editor.js is ready to work2!");
        },
        /**
         * This Tool will be used as default
         */
        placeholder: "Lets get some blogs running2!",

        data: {
          blocks: [{
          type: "header",
          data: {
            text: data?.title
          }
        }],
          version: "2.11.10"
        },
        // placeholder: "Sometext",

        readOnly: preview
      });
      featuredImageEditor = new EditorJS({
        /**
         * Id of Element that should contain Editor instance
         */
        holder: "feature-image",

        minHeight: 100,
        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
      
        tools: {
          simpleImage: SimpleImage,
          image: Image
        },

        // autofocus: true,
        /**
         * onReady callback
         */
        onReady: () => {
          console.log("Editor.js is ready to work3!");
        },
        /**
         * This Tool will be used as default
         */
        placeholder: "Upload an image",

        // data: {
        //   blocks: [
        //     {
        //       type: "header",
        //       data: data?.title
        //     }
        //   ],
        //   version: "2.11.10"
        // },
        // placeholder: "Sometext",

        readOnly: preview
      });

      console.log({titleEditor, editor})
      titleEditor.isReady.then(() => {
        // titleEditor.render && titleEditor.render({ blocks: [{
        //   type: "header",
        //   data: {
        //     text: data?.title
        //   }
        // }]})
      })
      
      // featuredImageEditor.isReady.then(() => {
      //   console.log(data.feature_image, "  ========== ")
      //   featuredImageEditor.render([
      //     {
      //       type: "paragraph",
      //       data: {
      //         text:
      //           'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.'
      //       }
      //   }
      // ])
        
      // })

      editor.isReady.then(() => {
        sampleData && editor?.blocks?.renderFromHTML && editor.blocks.renderFromHTML(sampleData)
      });

      // setEditor(editor1)
      // setFeaturedImageEditor(featuredImageEditor1)
      // setTitleEditor(titleEditor1)

    }
  }, [window, editor, titleEditor, featuredImageEditor])

  const save = async () => {
    let toggleReadOnly = false
    if (preview) {
      toggleReadOnly = true;
      editor.readOnly.toggle();
      featuredImageEditor.readOnly.toggle();
      titleEditor.readOnly.toggle()
    }
      const body = await editor.save()
        .then(outputData => {
          const htmlFormat = edjsHTML({ simpleImage: simpleImageParser}).parse(outputData)

          console.log("Article data: ", outputData);
          return htmlFormat.join("")

        })
      const feature_image = await featuredImageEditor.save()
      const title = await titleEditor.save()
  
            //   const htmlFormat = edjsHTML().parse(outputData)
      //   console.log("Article data: ", outputData);
      //   console.log(htmlFormat)
  
      fetch( url,{
        method: method,
        body: JSON.stringify({
          ...data,
          title: title.blocks[0]?.data?.text,
          html: body,
          feature_image: feature_image.blocks[0]?.data?.url
        })
      })

      if (toggleReadOnly) {
        editor.readOnly.toggle();
        featuredImageEditor.readOnly.toggle();
        titleEditor.readOnly.toggle()
      }


      // .then(outputData => {
      //   const htmlFormat = edjsHTML().parse(outputData)
      //   console.log("Article data: ", outputData);
      //   console.log(htmlFormat)

      // })
      // .catch(error => {
      //   console.log("Saving failed: ", error);
      // });
  };

  const handlePreview = () => {
    editor.readOnly.toggle();
    featuredImageEditor.readOnly.toggle();
    titleEditor.readOnly.toggle()
    setPreview(!preview)
  }

  const clear = () => {
    console.log(editor)
    editor.clear()
  }

    return (
      <div>
        { isEdit && <div style={{
          display: 'block',
          position: "fixed",
          zIndex: "10"
        }}>
          Editor <br/>
          <button onClick={save}>Save</button>
          <button onClick={handlePreview} >{preview ? "Edit": "Preview"}</button>
          <button onClick={clear} >{"Clear"}</button>
        </div>}
        <div>

          <p style={{
            maxWidth: '650px',
            margin: '0 auto'
          }}>Title</p>
          <div id="title" />
          <p style={{
            maxWidth: '650px',
            margin: '0 auto'
          }}>Feature image</p>
          <div id="feature-image" />

          <div id="codex-editor" />
        </div>
      </div>
    );
}

export default Editor;
