import React, {useEffect, useState} from 'react';
import logo from '../logo.svg';
import '../App.css';
  
export default function Home(){
    const [backendData, setBackendData] = useState([{}])

    useEffect(()=> {
        fetch("/api").then(
        response => response.json()
        ).then(
        data => {
            setBackendData(data);
        }
        )
    }, [])

    console.log(backendData);

    return (
    <div className="App">  
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h1 className="text-3xl font-bold underline">
          Test tailwinda
        </h1>
        
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    );
}

