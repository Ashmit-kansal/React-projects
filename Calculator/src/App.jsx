import Buttons from "./components/Buttons";
import { useState } from "react";

function App() {

  const [display, setDisplay] = useState("");
  const [result, setResult] = useState("0");

  return (
    <>
      <div className="w-full h-screen bg-blue-100 flex justify-center items-center">
        <div>
          <div className="min-h-12 w-80 px-2 bg-black flex flex-col justify-between">
          <div className="font-digital col-span-4 text-gray-200 break-words text-end">{display}</div>
          <div className="font-digital text-2xl col-span-4 text-white break-words text-end" >{result}</div>
          </div>
          <Buttons display={display} setDisplay={setDisplay} setResult={setResult}/>
        </div>
      </div>
    </>
  );
}

export default App;
