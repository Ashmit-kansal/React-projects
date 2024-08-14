import { useEffect, useState } from "react"
import Buttons from "./components/Buttons"
import OnOff from "./components/OnOff"
import Slider from "./components/Slider"


function App() {

  const [display, setDisplay] = useState('Drum machine');
  const [onPower, setonPower] = useState(true);
  const [onBank, setonBank] = useState(true);
  const [instrument,setInstrument] = useState(true);
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.4);

  useEffect(() => {
    if (onBank) {
      setDisplay('Heater kit');
    } else {
      setDisplay('Piano kit');
    }
  },[onBank])
  useEffect(() => {
    if (onPower) {
      setDisplay('Drum machine');
    } else {
      setDisplay('');
    }
  },[onPower]);

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center bg-gray-500 font-bold">
        <div className="bg-gray-300 max-w-[250px] w-full flex flex-col sm:flex-row sm:max-w-[380px] border-4 border-yellow-300">
          <Buttons instrument={instrument} setDisplay={setDisplay} power={power} volume={volume}/>          
          <div className="flex flex-col gap-3 m-5 items-center justify-center">
            <button className="outline-none" onClick={() => {
              setonPower(!onPower);
              setPower(!power);
            }}>
              <OnOff onOff={onPower} value="Power" />
            </button>
            <p className="bg-gray-400 text-sm p-2 min-w-20 h-9">{display}</p>
            <Slider setVolume={setVolume} setDisplay={setDisplay} />
            <button className="outline-none" onClick={() => {
              setonBank(!onBank);
              setInstrument(!instrument);
            }}>
              <OnOff onOff={onBank} value="Bank" />
            </button>
          </div>
        </div>
      </div>
    </>
  ) 

}


export default App
