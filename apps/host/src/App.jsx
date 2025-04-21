import { useState } from "react";
import "./App.css";

import Button from "remote/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Count: {count}</p>
        <Button clickHandler={() => setCount(count + 1)} />
      </div>
    </>
  );
}

export default App;
