import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from "axios";


function App() {
  const [word, setWord] = useState();
  const [errorMsg, setErrorMsg] = useState("");
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
      setEntry(resp.data[0])
		})
		.catch(e => {
			console.error("error", e)
      setErrorMsg("Can't find that word!")
		})
  }, [word]);

  return (
    <div className="App">
        <form>
          <input type="text" name="word" id="word" ref={inputRef}  />
          <button type='submit' onClick={handleClick}>Look it up</button>
        </form>
        {entry.word &&
        <>
        <p>{entry.word !== "undefined" && entry?.word}</p>
        <p>{entry.word !== "undefined" && entry?.phonetic}</p>
        {entry.word !== "undefined" && entry?.meanings?.map((meaning,i)=> <p key={i}>{meaning.partOfSpeech}</p>)}
        {entry.word !== "undefined" && entry?.meanings
          .map((meaning,i)=> <div key={i}>{meaning.definitions.map((def,index)=><p key={index}>{def.definition}</p>)}</div>)}
          </>
        }
        {entry.word === "undefined" &&
          <p>Enter a word!</p>
        }
        {errorMsg && !entry.word &&
          <p>{errorMsg}</p>
        }
    </div>
  );
}

export default App;
