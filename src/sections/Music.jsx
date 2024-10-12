import { Canvas } from "@react-three/fiber";
import { Center, PerspectiveCamera } from "@react-three/drei";
import { Suspense, useState, useRef  } from "react";
import CanvasLoader from "../components/Loading.jsx";
import Cassette from "../components/Cassette.jsx";
import AudioVisualizer from "../components/AudioVisualizer.jsx";

const Music = () => {
    const songs = [
        { path: "/assets/music/1.Country-Rock.mp3" },
        { path: "/assets/music/2.Rockish.mp3" },
        { path: "/assets/music/3.Sad-Ambient.mp3" },
        { path: "/assets/music/4.Western-Movie'ish.mp3" },
        { path: "/assets/music/5.Popish.mp3" },
        { path: "/assets/music/6.Happy-Country.mp3" },
        { path: "/assets/music/7.Hard-Rock.mp3" },
        { path: "/assets/music/8.Pop-Rock.mp3" }
    ];

    const [targetRotationY, setTargetRotationY] = useState(0); // This will store the final desired rotation
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(songs[0].path));
    const [isCassetteLoaded, setIsCassetteLoaded] = useState(false);
    const [audioContext, setAudioContext] = useState(null);

    const handleCassetteLoad = () =>{
        setIsCassetteLoaded(true);
    }

    const handleNext = () => {
        setTargetRotationY((prevTargetRotation) => prevTargetRotation - Math.PI * 2);

        let nextIndex = (currentSongIndex +1) % songs.length;
        setCurrentSongIndex(nextIndex);
        loadSong(nextIndex);
    };
    const handlePrevious = () => {
        setTargetRotationY((prevTargetRotation) => prevTargetRotation + Math.PI * 2);

        let prevIndex = (currentSongIndex -1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        loadSong(prevIndex);
    };
    const handlePlay = () => {
        if (!audioContext) {
            setAudioContext(new (window.AudioContext || window.webkitAudioContext)()); // Initialize the context only once
        }
        setIsPlaying(true);
        audioRef.current.play();
    };
    const handlePause = () => {
        setIsPlaying(false);
        audioRef.current.pause();
    }
    const loadSong = (index) => {
        audioRef.current.pause();
        audioRef.current.src = songs[index].path; // Set the new source
        if (isPlaying) {
            audioRef.current.play();
        }
    };


    return (
        <section className="c-space my-20">
            <p className="head-text py-5">Music Production Examples</p>
            <div className="grid-container bg-gray-900 p-5 rounded-lg border border-yellow-500 shadow-yellow-500/50">
                <p className="text-white-600 py-2 text-center">
                    Here are snippets of songs and sound designs that I’ve produced and mostly written myself, with a
                    few featuring co-authorship.
                </p>
            </div>

            <Canvas style={{height: '40vh', width: '100%'}}>
                <PerspectiveCamera makeDefault position={[0, 2.3, 1.5]} rotation={[-Math.PI / 3, 0, 0]}
                                   fov={45}/> {/* Move camera closer */}

                <ambientLight intensity={0.5}/>
                <directionalLight position={[10, 10, 5]} intensity={1}/>

                <Center>
                    <Suspense fallback={<CanvasLoader/>}>
                        <Cassette
                            targetRotationY={targetRotationY}
                            position={[0, -1, 0]}
                            onLoaded={handleCassetteLoad}  // Ensure the cassette is fully loaded
                            scale={isCassetteLoaded ? [30, 30, 30] : [0, 0, 0]}  // Scale only after it's loaded
                        />
                    </Suspense>
                </Center>
            </Canvas>

            <div className="flex justify-center mb-4">
                <div className="py-2 px-5 rounded-full text-center" style={{backgroundColor: 'rgb(174, 170, 87)'}}>
                    <p className="text-black-300 text-xl font-semibold">{songs[currentSongIndex].path.split('/').pop().replace('.mp3', '')}</p>
                </div>
            </div>

            {/* Music Player Buttons */}
            <div className="flex justify-center gap-8 mt-4">
                <button onClick={handlePrevious}
                        className="focus:outline-none hover:scale-105 transition-transform duration-200">
                    <img src="/assets/previous.svg" alt="Previous" className="w-20 h-20 filter invert brightness-75"/>
                </button>

                <button onClick={isPlaying ? handlePause : handlePlay}
                        className="focus:outline-none hover:scale-105 transition-transform duration-200">
                    <img src="/assets/paus.svg" alt="Pause" className="w-20 h-20 filter invert brightness-75"/>
                </button>

                <button onClick={handlePlay}
                        className="focus:outline-none hover:scale-105 transition-transform duration-200">
                    <img src="/assets/play.svg" alt="Play" className="w-20 h-20 filter invert brightness-75"/>
                </button>

                <button onClick={handleNext}
                        className="focus:outline-none hover:scale-105 transition-transform duration-200">
                    <img src="/assets/next.svg" alt="Next"
                         className="w-20 h-20 filter invert rotate-180 brightness-75"/>
                </button>
            </div>
            <div className="py-5" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <AudioVisualizer audioRef={audioRef} audioContext={audioContext}></AudioVisualizer>
            </div>

        </section>
    );
};

export default Music;