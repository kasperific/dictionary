import { useEffect, useRef, useState } from 'react';
import './App.css';
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
    <div className="App">
      <h1 className="text-3xl my-10 font-bold">Online Dictionary!</h1>
      <form className="flex justify-center mb-8">
        <input type="text" name="word" id="word" placeholder="Look it up" ref={inputRef} className="border-b-4 border-white bg-black mr-8 pl-4"  />
        <NeoBrutalistButton type='submit' id="submit" onClick={handleClick} label="Look it up" />
      </form>
      {entry.word && entry.word !== "undefined" && !error &&
        <>
          <p>{entry?.word}</p>
          <p>{entry?.phonetic}</p>
          {entry?.meanings?.map((meaning,i)=> <p key={i}>{meaning.partOfSpeech}</p>)}
          {entry?.meanings.map((meaning,i)=> <div key={i}>{meaning.definitions.map((def,index)=><p key={index}>{def.definition}</p>)}</div>)}
        </>
      }
      
      {error && 
        <p>{errorMsg}</p>
      }
    </div>
  );
}

export default App;
