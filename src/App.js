import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from "axios";


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
        <form>
          <input type="text" name="word" id="word" ref={inputRef}  />
          <button type='submit' onClick={handleClick}>Look it up</button>
        </form>
        {entry.word && entry.word !== "undefined" && !error &&
        <>
        <p>{entry?.word}</p>
        <p>{entry?.phonetic}</p>
        {entry?.meanings?.map((meaning,i)=> <p key={i}>{meaning.partOfSpeech}</p>)}
        {entry?.meanings.map((meaning,i)=> <div key={i}>{meaning.definitions.map((def,index)=><p key={index}>{def.definition}</p>)}</div>)}
          </>
        }
        {entry.word === "undefined" && !error &&
          <p>Enter a word!</p>
        }
        {error && 
          <p>{errorMsg}</p>
        }
    </div>
  );
}

export default App;
