import React, { useRef, useState, useEffect } from 'react';
import createClient from '@azure-rest/ai-vision-image-analysis';
import { AzureKeyCredential } from '@azure/core-auth';
// Load the .env file if it exists
require("dotenv").config();

const endpoint = 'https://test134.cognitiveservices.azure.com/';
const key = 'UMaNZ4tKtms97v6tW8FQwUQjYiqtuJdA8dEXZ918kAlvkIDjvuCWJQQJ99AKACYeBjFXJ3w3AAAFACOGkg76'; // Replace with your actual key
const credential = new AzureKeyCredential(key);
const client = createClient(endpoint, credential);

const wordsToRemove = ['ID:', 'Origin:', 'Destination:', 'Shipping:', 'Pieces:'];

interface WebcamOCRProps {
    setExtractedTexts: (texts: string[]) => void; // Define prop type for an array
    setIsLoading: (loading: boolean) => void; // Define prop type for loading state
    extractedTexts: string[]; // Add prop for extracted texts
}

const WebcamOCR: React.FC<WebcamOCRProps> = ({ setExtractedTexts, setIsLoading, extractedTexts }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [textBlock, setTextBlock] = useState<string[]>([]); // Change to an array to hold words

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
                setIsLoading(true); // Set loading state while analyzing
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
                const textLines: string[] = [];

                iaResult.readResult.blocks.forEach(block => {
                    block.lines.forEach(line => {
                        console.log(line.text);
                        textLines.push(line.text);
                    });
                });

                // Clean and filter out unwanted words
                const cleanedTextLines = textLines.filter(word => !wordsToRemove.includes(word));
                
                // Set cleaned texts to parent component
                setExtractedTexts(cleanedTextLines);
                
                // Update textBlock state if needed for local display
                setTextBlock(cleanedTextLines);

            }
        } catch (error) {
            console.error("There was an error!", error);
        } finally {
            setIsLoading(false); // Ensure loading is set to false after processing
        }
    };

    return (
        <div>
            <div className='flex flex-col vertical-center'>
                <video ref={videoRef} width="640" height="480" autoPlay></video>
                <button 
    onClick={captureImage} 
    style={{
        backgroundColor: '#4CAF50', 
        color: 'white',              
        padding: '10px 20px',       
        border: 'none',             
        borderRadius: '5px',       
        cursor: 'pointer',          
        fontSize: '16px',          
        transition: 'background-color 0.3s ease' 
    }}
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'} 
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}  
>
    Capture & Analyze Image
</button>
                <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
            </div>
        </div>
    );
};

export default WebcamOCR;