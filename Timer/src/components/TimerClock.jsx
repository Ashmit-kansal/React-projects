import { useState } from "react";
import { FaArrowDown,  FaArrowUp } from "react-icons/fa";
import Display from "./Display";

export default function TimerClock() {

    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [disabled, setDisabled] = useState(false);

    return (
        <>
        <div className="flex gap-8 my-2">
            <div>
                <p>Break Length</p>
                <div className="flex gap-3 justify-center">
                    <button disabled={disabled} onClick={() => setBreakLength(breakLength > 1 ? breakLength - 1 : breakLength)}><FaArrowDown /></button>
                    <p>{breakLength}</p>
                    <button disabled={disabled} onClick={() => setBreakLength(breakLength<60 ? breakLength + 1 : breakLength)}><FaArrowUp /></button>
                </div>
            </div>
            <div>
                <p>Session Length</p>
                <div className="flex gap-3 justify-center">
                    <button disabled={disabled} onClick={() => setSessionLength(sessionLength > 1 ? sessionLength - 1 : sessionLength)}><FaArrowDown /></button>
                    <p>{sessionLength}</p>
                    <button disabled={disabled} onClick={() => setSessionLength(sessionLength<60 ? sessionLength + 1 : sessionLength)}><FaArrowUp /></button>
                </div>
            </div>
        </div>
        <Display breakLength={breakLength} sessionLength={sessionLength} setSessionLength={setSessionLength} setDisabled={setDisabled}/>
        </>
    );
}