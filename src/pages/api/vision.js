import vision from '@google-cloud/vision';
import fs from 'fs';
import path from 'path';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './clientSecret.json';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log("POSTING");
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // Decode the base64 string
        const buffer = Buffer.from(image, 'base64');

        // Create a file path
        const filePath = path.join(process.cwd(), 'public', 'uploads', `captured-image-${Date.now()}.png`);

        // Save the image locally
        fs.writeFile(filePath, buffer, (err) => {
            if (err) {
                console.error('Error saving the image:', err);
                return res.status(500).json({ error: 'Error saving the image' });
            }

            // Now you can use the file path if needed
            // Process the image using Google Vision API
            const request = {
                requests: [
                    {
                        image: { content: image },
                        features: [{ type: 'TEXT_DETECTION' }],
                    },
                ],
            };

            const client = new vision.ImageAnnotatorClient();
            client.batchAnnotateImages(request)
                .then(([result]) => {
                    const fullTextAnnotation = result.responses[0]?.fullTextAnnotation;
                    if (fullTextAnnotation && fullTextAnnotation.text) {
                        return res.status(200).json({ text: fullTextAnnotation.text });
                    } else {
                        return res.status(204).json({ text: 'No text detected' });
                    }
                })
                .catch(error => {
                    console.error('Error processing image:', error);
                    return res.status(500).json({ error: 'Failed to process image', details: error.message });
                });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}