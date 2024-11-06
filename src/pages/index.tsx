import localFont from "next/font/local";
import Head from "next/head";
import { useRouter } from "next/router";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  const handleScan = () => {
    router.push("/scan");
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-cols-4 w-full h-screen p-5`}
      style={{
        backgroundColor: "rgb(0, 101, 100)",
        gridTemplateRows: "16% 16% 16% 16% 16% 20%",}}
    >
      <Head>
        <title>
          CargoVision
        </title>
      </Head>
        <h1 className="text-5xl text-white col-start-4 row-start-1 row-span-2 flex justify-center items-center">CargoVision</h1>
        <button
          className="col-start-4 row-start-3 row-span-3 text-5xl mb-7 text-black rounded-xl flex justify-center
          items-center transition duration-300 ease-in-out transform hover:scale-105 shadow"
          style={{ backgroundColor: 'rgb(220, 211, 188)'}}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'rgb(235, 237, 236)')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'rgb(220, 211, 188)')}
          onClick={handleScan}
          >
            Scan
        </button>
        <div
          className="col-start-1 col-span-2 row-start-1 row-span-5 justify-center items-center flex"
          style={{
            backgroundColor: "#DCD3BC",
            width: "95%",
            height: "95%",
            borderRadius: "10px",
            padding: "20px",
          }}
          >
          <span className="text-6xl">Scanner Shit</span>
        </div>
          <span className="col-start-3 col-span-2 row-start-1 text-3xl text-white flex items-center">MAWB: 123456789</span>
          <span className="col-start-3 col-span-2 row-start-2 text-3xl text-white flex items-center">HAWB: 987654321</span>
          <span className="col-start-3 row-start-3 text-3xl text-white flex items-center">Departure: MNL</span>
          <span className="col-start-3 row-start-4 text-3xl text-white flex items-center">Destination: HKG</span>
          <span className="col-start-3 row-start-5 text-3xl text-white flex items-center">Pieces: 15</span>
          <div className="col-start-1 col-span-3 row-start-6 flex justify-center items-center">
            <input className="text-4xl text-black rounded-full"
              type="text" 
              placeholder="Search"
              style={{
                backgroundColor: "rgb(220, 211, 188)",
                width: "100%",
                height: "70%",
                textAlign: "center",
              }}>
            </input>
          </div>
          <span className="col-start-4 row-start-6 text-3xl text-white flex justify-center items-center">Status: Null</span>
      </div>
  );
}