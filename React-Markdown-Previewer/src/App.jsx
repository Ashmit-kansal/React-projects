import useFullscreen from "./customHook/useFullScreen"
import { BsArrowsFullscreen } from "react-icons/bs";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


function App() {
  const initialMarkdown = '# Welcome to my React Markdown Previewer!'
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const { elementRef: editorRef, toggleFullscreen: toggleEditorFullscreen, isFullscreen: isEditorFullscreen } = useFullscreen();
  const { elementRef: previewerRef, toggleFullscreen: togglePreviewerFullscreen, isFullscreen: isPreviewerFullscreen } = useFullscreen();  

  return (
    <>
      <div className="bg-green-500 w-full h-screen flex gap-4 ">
        <div className="w-[40vw] h-[90vh] ml-5 mt-4 border border-black flex flex-col shadow-lg shadow-black" ref={editorRef}> 
          <header className="bg-blue-400 border border-black flex justify-between px-3">
            <p>Editor</p>
            <button onClick={toggleEditorFullscreen}>{!isEditorFullscreen ? <BsArrowsFullscreen />:<AiOutlineFullscreenExit />}</button>
          </header>
          <textarea onChange={(e)=> setMarkdown(e.target.value)} value={markdown} className="bg-green-100 flex-1 resize-none focus:outline-none text-xs"></textarea>
        </div>
        <div className="w-[50vw] h-[90vh] mt-4 flex flex-col border border-black shadow-lg shadow-black" ref={previewerRef}> 
          <header className="bg-blue-400 border border-black flex justify-between px-3">
            <p>Previewer</p>
            <button onClick={togglePreviewerFullscreen}>{!isPreviewerFullscreen ? <BsArrowsFullscreen />:<AiOutlineFullscreenExit />}</button>
          </header>
          <article className="bg-green-100 flex-1  overflow-scroll">
            <ReactMarkdown className="text-sm prose lg:prose-xl"
            remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </>
  )
}

export default App
