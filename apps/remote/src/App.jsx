import { useState } from "react";
import Button from "./components/Button/Button.jsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Count: {count}</p>
      </div>
      <Button clickHandler={() => setCount(count + 1)} />
    </>
  );
}

export default App;
