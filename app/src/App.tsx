import './App.css'

function App() {

  const getData = () => {
    fetch('http://localhost:5000/api')
      .then(res => res.json())
      .then(data => console.log(data))
  }
  return (
    <>
      <h1 className="text-3xl font-bold underline" onClick={getData}>
        Click to get log from server api
      </h1>
    </>
  )
}

export default App
