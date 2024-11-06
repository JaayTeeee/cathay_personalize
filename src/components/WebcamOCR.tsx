import React, { useRef, useState, useEffect } from 'react';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
// Load the .env file if it exists
require("dotenv").config();

const endpoint = 'https://test134.cognitiveservices.azure.com/';
const key = 'UMaNZ4tKtms97v6tW8FQwUQjYiqtuJdA8dEXZ918kAlvkIDjvuCWJQQJ99AKACYeBjFXJ3w3AAAFACOGkg76';
const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const WebcamOCR: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [textBlock, setTextBlock] = useState<string>('');

    // Automatically start the camera when the component mounts
    useEffect(() => {
        startCamera();
    }, []);

    const startCamera = async () => {
        if (videoRef.current) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            } catch (error) {
                console.error("Error accessing webcam: ", error);
            }
        }
    };

    const captureImage = async () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                const imageData = canvasRef.current.toDataURL('image/png');

                // Analyze image using Azure Image Analysis
                await analyzeImage(imageData);
            }
        }
    };

    const analyzeImage = async (imageData: string) => {
        const base64Image = imageData.split(',')[1];
        const binaryImage = atob(base64Image);
        const byteArray = new Uint8Array(binaryImage.length);
        for (let i = 0; i < binaryImage.length; i++) {
            byteArray[i] = binaryImage.charCodeAt(i);
        }

        const features = ['Caption', 'Read'];

        try {
            const result = await client.path('/imageanalysis:analyze').post({
                body: byteArray,
                queryParameters: { features },
                contentType: 'application/octet-stream'
            });

            const iaResult = result.body;

            if (iaResult.captionResult) {
                console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
            }

            if (iaResult.readResult) {
                console.log("README:", iaResult.readResult);
                const textLines = [];

                iaResult.readResult.blocks.forEach(block => {
                    block.lines.forEach(line => {
                        console.log(line.text);
                        textLines.push(line.text);
                    });
                });

                setTextBlock(textLines.join('\n'));
            }
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div>
            <h1>Webcam OCR</h1>
            <div className='flex flex-col vertical-center'>
                <video ref={videoRef} width="640" height="480" autoPlay></video>
                <button onClick={captureImage}>Capture & Analyze Image</button>
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
            <div>
                <h2>Text Blocks:</h2>
                <ul>
                    {textBlock.split('\n').map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default WebcamOCR;