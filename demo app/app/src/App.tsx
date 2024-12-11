import { useFetch } from "./hooks/useFetch";
import "./App.css";

function App() {
  const { data, loading, error } = useFetch("http://localhost:3001/");
  return (
    <>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && <p>{data}</p>}
      </div>
    </>
  );
}

export default App;
