import { useState, useEffect } from "react";
import { VscDebugPause, VscDebugStart } from "react-icons/vsc";
import { LuTimerReset } from "react-icons/lu";
import beep from "../assets/beep.wav";

export default function Display({ breakLength, sessionLength, setDisabled }) {
    const [minutes, setMinutes] = useState(sessionLength);
    const [seconds, setSeconds] = useState(0);
    const [display, setDisplay] = useState(`${sessionLength}:00`);
    const [started, setStarted] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        setMinutes(sessionLength);
        setSeconds(0);
        setDisplay(`${minutes < 10 ? "0" + minutes : minutes}:00`);
    }, [sessionLength]);

    useEffect(() => {
        setDisplay(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    }, [minutes, seconds]);

    const start = () => {
        if (timer) return; // Prevent multiple intervals

        setDisabled(true);
        setStarted(true);

        const newTimer = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 0) {
                    setMinutes((prevMinutes) => {
                        if (prevMinutes === 0) {
                            // Restart timer with breakLength
                            const audio = new Audio(beep);
                            audio.play();
                            setMinutes(breakLength);
                            setSeconds(0);
                            return breakLength;
                        } else {
                            setSeconds(59);
                            return prevMinutes - 1;
                        }
                    });
                    return 59;
                } else {
                    return prevSeconds - 1;
                }
            });
        }, 1000);

        setTimer(newTimer);
    };

    const stop = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
            setDisabled(false);
            setStarted(false);
        }
    };

    const reset = () => {
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
        setDisabled(false);
        setStarted(false);
        setMinutes(sessionLength);
        setSeconds(0);
        setDisplay(`${sessionLength}:00`);
    }

    return (
        <>
            <div className="border-4 border-green-950 rounded-2xl p-4 text-center my-2">
                <p>Session</p>
                <p className="text-3xl">{display}</p>
            </div>
            <div className="flex gap-2">
                <button disabled={started} onClick={start}><VscDebugStart /></button>
                <button onClick={stop}><VscDebugPause /></button>
                <button onClick={reset}><LuTimerReset /></button>
            </div>
        </>
    );
}