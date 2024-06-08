import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import Playground from "./components/playground";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/play" element={<Playground />} />
      </Routes>
    </div>
  );
}

export default App;
