import {e,t} from './audioData';
import { useEffect, useRef } from 'react';

export default function Buttons({instrument,setDisplay,power,volume}) {

    const eVariable = e;
    const tVariable = t;

    const audioRefs = useRef({});

    const playSound = (e) => {
        const audio = new Audio(e.target.value);
        audio.volume =volume;
        audio.play();
        audioRefs.current[e.target.id] = audio;
        e.target.style.backgroundColor = 'blue';
        setTimeout(() => {
            e.target.style.backgroundColor = '';
        }, 100);
        setDisplay(e.target.id);
    }
    const handleKeyPress = (e) => {
        const key = e.key.toLowerCase();
        const sound = instrument ? eVariable.find(item => item.keyTrigger.toLowerCase() === key) : tVariable.find(item => item.keyTrigger.toLowerCase() === key);
        if (sound) {
            const audio = new Audio(sound.url);
            audio.volume = volume;
            audio.play();
            audioRefs.current[sound.id] = audio;
            const button = document.querySelector(`button[value="${sound.url}"]`);
            button.style.backgroundColor = 'blue';
            setTimeout(() => {
                button.style.backgroundColor = '';
            }, 100);
            setDisplay(button.id);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [instrument, eVariable, tVariable]);


    return (
        <div className="grid grid-cols-3 gap-1 m-4 ml-4 min-w-[180px] max-w-[200px] w-full mx-auto">
            {instrument ? (
                eVariable.map((item) => {
                    return (
                        <button onClick={e => playSound(e)} id={item.id} value={item.url} key={item.id} className="w-full h-14 bg-gray-400 shadow-md shadow-black active:shadow-none rounded outline-none" disabled={!power}>{item.keyTrigger}</button>
                    )
                })
            ) : (
                tVariable.map((item) => {
                    return (
                        <button onClick={e => playSound(e)} id={item.id} value={item.url} key={item.id} className="w-full h-14 bg-gray-400 shadow-md shadow-black active:shadow-none rounded outline-none" disabled={!power}>{item.keyTrigger} </button>
                    )
                })
            )}
        </div>
    )
}