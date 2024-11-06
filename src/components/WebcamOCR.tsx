import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';

const WebcamOCR: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [extractedText, setExtractedText] = useState<string>('');
    
    const startCamera = async () => {
        if (videoRef.current) {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            videoRef.current.play();
        }
    };

    const captureImage = async () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = canvasRef.current.toDataURL('image/png');

                // Perform OCR
                Tesseract.recognize(
                    imageData,
                    'eng',
                    {
                        logger: (info) => console.log(info),
                    }
                ).then(({ data: { text } }) => {
                    setExtractedText(text);
                });
            }
        }
    };

    return (
        <div>
            <h1>Webcam OCR</h1>
            <div className='flex flex-col vertical-center'>
            <video ref={videoRef} width="640" height="480" autoPlay></video>
            <button onClick={captureImage}>Capture & Extract Text</button>
            <button onClick={startCamera}>Start Camera</button>
            <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
            <div>
                <h2>Extracted Text:</h2>
                <p>{extractedText}</p>
            </div>
        </div>
    );
};

export default WebcamOCR;