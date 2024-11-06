import React, { useRef, useState } from 'react';
import Tesseract from 'tesseract.js';
import { ImageAnalysisClient } from '@azure-rest/ai-vision-image-analysis';
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

                // Analyze image using Azure Image Analysis
                await analyzeImage(imageData);
            }
        }
    };
    const analyzeImage = async (imageData: string) => {
        // Step 1: Decode the base64 image data into binary format
        const base64Image = imageData.split(',')[1]; // Get the base64 string without the prefix
        const binaryImage = atob(base64Image); // Decode base64 to binary
        const byteArray = new Uint8Array(binaryImage.length); // Create a byte array
        for (let i = 0; i < binaryImage.length; i++) {
            byteArray[i] = binaryImage.charCodeAt(i); // Populate byte array with binary data
        }
    
        const features = [
            'Caption',
            'Read'
        ];
    
        // Step 3: Make the POST request with the binary image data
        try {
            const result = await client.path('/imageanalysis:analyze').post({
                body: byteArray,
                queryParameters: {
                    features: features
                },
                contentType: 'application/octet-stream'
            });
    
            const iaResult = result.body;
    
            // Check for caption result
            if (iaResult.captionResult) {
                console.log(`Caption: ${iaResult.captionResult.text} (confidence: ${iaResult.captionResult.confidence})`);
            }
    
            // Extract text lines from read results
            if (iaResult.readResult) {
                console.log("README:", iaResult.readResult);
                const textLines = [];
    
                // Iterate through blocks
                iaResult.readResult.blocks.forEach(block => {
                    // Iterate through lines in each block
                    block.lines.forEach(line => {
                        console.log(line.text); // Log each line of text
                        textLines.push(line.text); // Collect text lines into an array
                    });
                });
    
                // Optionally, you can set the collected text lines to the state
                setTextBlock(textLines.join('\n')); // Join text lines with new line for display
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
                <button onClick={startCamera}>Start Camera</button>
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
            <div>

                <h2>Text Blocks:</h2>
                <ul>
                    {textBlock}
                </ul>
            </div>
        </div>
    );
};

export default WebcamOCR;