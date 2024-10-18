import { useRef, useEffect } from "react";
import "../styles/Gallery.css"; // Ensure this path points to your Gallery.css file

const Gallery = () => {
    const trackRef = useRef(null);

    // Handling the mouse and touch events for gallery dragging
    const handleOnDown = (e) => {
        trackRef.current.dataset.mouseDownAt = e.clientX || e.touches[0].clientX;
    };

    const handleOnUp = () => {
        trackRef.current.dataset.mouseDownAt = "0";
        trackRef.current.dataset.prevPercentage = trackRef.current.dataset.percentage;
    };

    const handleOnMove = (e) => {
        if (trackRef.current.dataset.mouseDownAt === "0") return;

        const mouseDelta = parseFloat(trackRef.current.dataset.mouseDownAt) - (e.clientX || e.touches[0].clientX),
            maxDelta = window.innerWidth / 2;

        const sensitivityFactor = 0.5; // Adjust this value (0.5 or lower for slower scrolling)
        const percentage = (mouseDelta / maxDelta) * -100 * sensitivityFactor;

        const nextPercentageUnconstrained = parseFloat(trackRef.current.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        trackRef.current.dataset.percentage = nextPercentage;

        trackRef.current.style.transform = `translate(${nextPercentage}%, -50%)`;

        for (const image of trackRef.current.getElementsByClassName("image")) {
            image.style.objectPosition = `${100 + nextPercentage}% center`;
        }
    };

    // Attach event listeners on mount and cleanup on unmount
    useEffect(() => {
        window.addEventListener("mousedown", handleOnDown);
        window.addEventListener("mouseup", handleOnUp);
        window.addEventListener("mousemove", handleOnMove);

        window.addEventListener("touchstart", handleOnDown);
        window.addEventListener("touchend", handleOnUp);
        window.addEventListener("touchmove", handleOnMove);

        return () => {
            window.removeEventListener("mousedown", handleOnDown);
            window.removeEventListener("mouseup", handleOnUp);
            window.removeEventListener("mousemove", handleOnMove);

            window.removeEventListener("touchstart", handleOnDown);
            window.removeEventListener("touchend", handleOnUp);
            window.removeEventListener("touchmove", handleOnMove);
        };
    }, []);

    return (
        <section className="gallery-section">
            <p className="head-text py-5">Gallery</p>
            <p className="text-white text-center text-xl ">
                Click and drag
                <span className="text-2xl px-2"> ← </span>
                <span className="text-2xl px-2"> → </span>
            </p>
            <div id="image-track" ref={trackRef} data-mouse-down-at="0" data-prev-percentage="0">
                <img className="image" src="/assets/gallery/pilt1.jpg" alt="Gallery1" draggable="false"/>
                <img className="image" src="/assets/gallery/pilt2.jpg" alt="Gallery2" draggable="false"/>
                <img className="image" src="/assets/gallery/pilt3.jpg" alt="Gallery3" draggable="false"/>
                <img className="image" src="/assets/gallery/pilt4.jpg" alt="Gallery4" draggable="false"/>

            </div>
        </section>
    );
};

export default Gallery;