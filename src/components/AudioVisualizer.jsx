import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

const AudioVisualizer = ({ audioRef, audioContext }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!audioContext) return; // Wait for the audioContext to be initialized

        // Create an analyser node
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const audio = audioRef.current;
        const source = audioContext.createMediaElementSource(audio);

        // Connect the source to both the analyser and the audio output
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        // Set up canvas
        const canvas = canvasRef.current;
        const canvasCtx = canvas.getContext('2d');
        const WIDTH = canvas.width;
        const HEIGHT = canvas.height;

        // Minimum frequency bin index to display (skip lower frequencies)
        const minFrequencyBinIndex = Math.floor(200 / (audioContext.sampleRate / 2) * bufferLength);  // Calculating the index for 50Hz

        const drawVisualizer = () => {
            analyser.getByteFrequencyData(dataArray);
            canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

            const barWidth = (WIDTH / (bufferLength - minFrequencyBinIndex)) * 1.5;
            let barHeight;
            let x = 0;

            for (let i = minFrequencyBinIndex; i < bufferLength; i++) {
                // Apply logarithmic scaling with lower multiplier to make the movement more dynamic
                barHeight = Math.log(dataArray[i] + 1) * 5;  // Lower the multiplier to 5

                // Optionally, add a linear term to increase dynamic range in high frequencies
                barHeight += dataArray[i] / 10;  // Small linear boost for high frequencies

                // Cap the bar height to prevent them from becoming too tall
                barHeight = Math.min(barHeight, HEIGHT);

                // Draw original bar
                canvasCtx.fillStyle = `rgb(${barHeight + 100}, 178, 87)`;
                canvasCtx.fillRect(x, HEIGHT / 2 - barHeight, barWidth, barHeight);

                // Draw reflection (upside down and slightly transparent)
                canvasCtx.globalAlpha = 0.2;
                canvasCtx.fillRect(x, HEIGHT / 2, barWidth, barHeight);  // Flip vertically
                canvasCtx.globalAlpha = 1;
                x += barWidth + 1;
            }

            requestAnimationFrame(drawVisualizer);
        };
        drawVisualizer(); // Start visualizer animation

        return () => {
            source.disconnect();
        };
    }, [audioRef, audioContext]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <canvas ref={canvasRef} width="600" height="100" />
        </div>
    );
};

// Define PropTypes for validation
AudioVisualizer.propTypes = {
    audioRef: PropTypes.object.isRequired,
    audioContext: PropTypes.object.isRequired,
};

export default AudioVisualizer;