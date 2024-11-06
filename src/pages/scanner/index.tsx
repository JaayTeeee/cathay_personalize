import Head from 'next/head';
import WebcamOCR from '../../components/WebcamOCR';

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Webcam OCR</title>
                <meta name="description" content="Webcam OCR using Tesseract.js" />
            </Head>
            <main>
                <WebcamOCR />
            </main>
        </div>
    );
};

export default Home;