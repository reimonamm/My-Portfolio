import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('reimo.namm@gmail.com');
        setHasCopied(true);

        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <section className="c-space my-20" id="about">
            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container overflow-hidden">
                        <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] object-cover rounded-xl" />

                        <div>
                            <p className="grid-headtext">Hi, I’m Reimo Namm</p>
                            <p className="grid-subtext">
                                I have been a full-time musician for seven years. A little over a year ago, I decided to explore new seas in my life.
                                I found my way into IT, and now I’m a student at Kood/Jõhvi programming school, where I’m learning to become a full-stack developer.
                                The innovative peer-to-peer learning style at Kood/Jõhvi suits me well, and I love the idea that any problem can be solved with a bit of help from the almighty Internet.
                                I am ready to embrace with open arms any opportunities and challenges the developer world has to offer.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">Tech Stack</p>
                            <p className="grid-subtext">
                                I specialize in building full-stack applications using technologies like JavaScript, React, Express, Tailwind, SQL, and more. My goal is to create seamless, user-friendly experiences that meet modern web standards.
                                Whether it's creating a new website, improving an existing one, or developing a custom application, I’m well-versed in both front-end and back-end technologies to bring your vision to life.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                                labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
                            />
                        </div>
                        <div>
                            <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
                            <p className="grid-subtext">I’m based in Tartu, Estonia, but I’m open to collaborating with teams or clients across the globe.
                                I thrive in flexible, remote work environments and am always ready to adapt to different time zones.</p>
                            <a href="#contact">
                                <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
                            </a>

                        </div>
                    </div>
                </div>

                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

                        <div>
                            <p className="grid-headtext">My Passion for Coding</p>
                            <p className="grid-subtext">
                                I’m a creative and disciplined person—two qualities that may not always seem to align, but in coding,
                                I’ve found the perfect balance. I’ve always loved building things, and now that I’m immersed in the world of IT,
                                I’m channeling the creativity I once used for music into crafting well-structured, efficient code.
                                Every new challenge is an opportunity to learn, grow, and create something meaningful.
                                I’m excited to take on projects that push my skills further and allow me to bring innovative ideas to life through development.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container">
                        <img
                            src="assets/grid4.png"
                            alt="grid-4"
                            className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
                        />

                        <div className="space-y-2">
                            <p className="grid-subtext text-center">Contact me</p>
                            <div className="copy-container" onClick={handleCopy}>
                                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">reimo.namm@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;