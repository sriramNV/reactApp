import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvise] = useState("");
  const [count, setCount] = useState(0);

  async function getAdvise() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvise(data.slip.advice);
    setCount((c) => c + 1);
  }

  useEffect(function () {
    getAdvise();
  }, []);

  return (
    <div className="d-inline-flex flex-column align-items-center align-self-center p-4 mar">
      <h1>Hello World! Welcome to the spiritual place to get some advice</h1>
      <button onClick={getAdvise}>get Advise</button>
      <h2>{advice}</h2>
      <Message count={count} />
    </div>
  );
}

function Message(props) {
  return (
    <h3>
      you have read <strong>{props.count}</strong> pieces of advice
    </h3>
  );
}

export default App;
