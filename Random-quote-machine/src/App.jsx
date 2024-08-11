import { FaQuoteLeft } from "react-icons/fa";
import { SlSocialTwitter } from "react-icons/sl";
import { LuLinkedin } from "react-icons/lu";
import { useEffect, useState } from "react";

function App() {

  const [color, setColor] = useState('#000000')
  const [quote, setQuote] = useState({});

  // fetching the api using getquote
  const url_api = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
  async function getquote(url) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const random = Math.floor(Math.random() * data.quotes.length);
      setQuote(data.quotes[random]);
    } catch (error) {
      console.error('Error fetching the quote:', error);
    }
  }

  //changing the colors of different elements at same time using a state on the click of button
  //changing the quote on the click of button
  const newQuote = () => {
    const letters = '0123456789ABCDEF';
    let tempColor = '#';
    for (let i = 0; i< 6; i++){
      tempColor += letters[Math.floor(Math.random()*16)];
    }
    setColor(tempColor);

    getquote(url_api);
  }

  // using useEffect to load first quote at the time of rendering
  useEffect(() => {
    getquote(url_api);
  },[]);

  //sharing the quote on twitter on click of twitter button
  const tweet = () => {
    const text = encodeURIComponent(`"${quote.quote}"\n\n - ${quote.author}`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

  //sharing the quote on linkedin on click of linkedin button
  const linkedin = () => {
    const text = encodeURIComponent(`"${quote.quote}"\n\n - ${quote.author}`);
    const url = `https://www.linkedin.com/sharing/share-offsite/?text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div style={{backgroundColor: color}} 
           className="transition-colors duration-1000 ease-in-out h-screen flex flex-col items-center justify-center">
        <div className="w-[450px] bg-white px-[50px] py-[30px] rounded-md">
          <p className="transition-colors duration-1000 ease-in-out" 
             style={{color}}>
             <FaQuoteLeft className="inline mb-1" /> 
            {quote.quote}
          </p>
          <p style={{color}} 
             className="transition-colors duration-1000 ease-in-out text-right font-thin mb-4">
             - {quote.author} 
          </p>
          <div className="flex">
            <div>
              <button onClick={tweet} 
                      style={{backgroundColor: color}} 
                      className="transition-colors duration-1000 ease-in-out bg-black text-white p-1 rounded-sm mr-1 hover:opacity-75">
                      <SlSocialTwitter/>
              </button>
              <button onClick={linkedin} 
                      style={{backgroundColor: color}} 
                      className="transition-colors duration-1000 ease-in-out bg-black text-white p-1 rounded-sm hover:opacity-75">
                      <LuLinkedin  />
              </button>
            </div>
            <button onClick={newQuote} 
                    className="transition-colors duration-1000 ease-in-out ml-auto bg-black text-white p-2 rounded-sm text-[8px] hover:opacity-75" 
                    style={{backgroundColor: color}} >
                    New quote
            </button>
          </div>
        </div>
        <p className="text-white mt-3">
          by Ashmit Kansal
        </p>
      </div>
    </>
  )
}

export default App
