import { useCallback, useEffect, useRef, useState } from "react";

//Creating a custom hook for adding the functionality of fullscreen and toggling the icon for fullScreen 
export default function useFullscreen() {

    const elementRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) {
            elementRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch((err) => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false));
        }
    }, []);

    //Handling the toggling of icon
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);
    return { elementRef, toggleFullscreen, isFullscreen };
}