import { useState } from "react";

function App() {
  const [advice, setAdvise] = useState("");

  async function getAdvise() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvise(data.slip.advice);
  }

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={getAdvise}>get Advise</button>
      <p>{advice}</p>
    </>
  );
}

export default App;
