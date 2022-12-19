import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import NeoBrutalistButton from './NeoBrutalistButton';


function App() {
  const [word, setWord] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);
  const [entry, setEntry] = useState([]);

  const inputRef = useRef(null);

  function handleClick(e) {
    e.preventDefault();
    setWord(inputRef.current.value)
  }

  useEffect(() => {
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(resp => {
			console.log('entry data', resp.data)
      setError(false)
      setEntry(resp.data[0])
		})
		.catch(e => {
      if (error.response || error.request) {
        setErrorMsg("There appears to be a problem. Please try again later!")
      } else {
          setError(true)
          setErrorMsg("Can't find that word!")
      }
		})
  }, [word, error]);

  return (
      <h1 className="text-4xl my-10 font-bold">Online Dictionary!</h1>
    <div className="text-center">
      <form className="flex justify-center mb-8">
        <input type="text" name="word" id="word" placeholder="Look it up" ref={inputRef} className="border-b-4 border-white bg-black mr-8 pl-4"  />
        <NeoBrutalistButton type='submit' id="submit" onClick={handleClick} label="Look it up" />
      </form>
      <section className="sm:w-3/6 m-auto">
      {entry.word && entry.word !== "undefined" && !error &&
        <div className="font-sans-serif text-left flex items-center flex-col">
       
          <h2 className="text-3xl font-bold">{entry?.word}</h2>
          <h3 className="text-xl">{entry?.phonetic}</h3>
          <ul className="text-lg">
            {entry?.meanings?.map((meaning,i)=> 
            <li key={i} className="mb-4">
              <div className='text-xl'>{meaning.partOfSpeech} </div>
              <ol className="list-decimal ml-8">
                {meaning.definitions.map((def,index)=><li key={index}>{def.definition}</li>)}
              </ol>
              </li>
              )}
          </ul>
          
        </div>
      }
      
      {error && 
        <p>{errorMsg}</p>
      }
      </section>
    </div>
  );
}

export default App;
