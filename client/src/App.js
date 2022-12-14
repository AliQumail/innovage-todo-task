import "./App.css";
import Todo from "./components/Todo/Todo";
import { useState, useEffect } from "react";

function App() {
  const [todoArr, setTodoArr] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/get-todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodoArr(data);
      })
      .catch((error) => {
        throw error;
      });
  }, [todoArr]);
  return (
    <div className="App">
      <h4 className="mt-4">Innovage Home Task Demo </h4>
      <Todo todoArr={todoArr} />
    </div>
  );
}

export default App;
