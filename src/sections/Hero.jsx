import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera} from "@react-three/drei";
import HackerRoom from "../components/HackerRoom.jsx";
import {Suspense} from "react";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {useMediaQuery} from "react-responsive";
import {calculateSizes} from "../constans/index.js";
import Model from "../components/Model.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";

const Hero = () => {

    const isSmall = useMediaQuery({maxWidth:440})
    const isMobile = useMediaQuery({maxWidth: 768})
    const isTablet = useMediaQuery({minWidth: 768, maxWidth: 1024})

    const sizes = calculateSizes(isSmall, isMobile, isTablet);

    return (
        <section className="min-h-screen w-full flex flex-col relative">

            <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">

                <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
                    Hi, I am Reimo <span className="waving-hand">👋</span>
                </p>
                <p className="hero_tag text-gray_gradient text-center">
                    Building Products & Producing Music
                </p>
            </div>

            {/* <Leva></Leva> */}
            <div className="w-full h-full absolute inset-0">

                <Canvas className="w-full h-full">
                    <Suspense fallback={<CanvasLoader></CanvasLoader>}>

                    <PerspectiveCamera makeDefault position={[0, 0, 20]}></PerspectiveCamera>
                    <HeroCamera isMobile={isMobile}>
                        <HackerRoom
                            position={sizes.deskPosition}
                            rotation={[0, -Math.PI, 0]}
                            scale={sizes.deskScale}
                        >
                        </HackerRoom>
                    </HeroCamera>
                        <group>
                            <directionalLight position={[1, 1, 1]} intensity={3}/>
                            <Model position={sizes.targetPosition}></Model>
                            <ReactLogo position={sizes.reactLogoPosition}></ReactLogo>


                        </group>

                        <ambientLight intensity={1}/>
                        <directionalLight position={[10,10,10]} intensity={0.5} />
                    </Suspense>
                </Canvas>
            </div>
            <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
                <a href="#about" className="w-fit">
                    <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96"></Button>
                </a>
            </div>

        </section>
    )
}
export default Hero
