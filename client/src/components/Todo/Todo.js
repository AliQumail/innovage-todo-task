import { useState } from "react";
import UpdateModal from "../UpdateModal/UpdateModal";
import "./Todo.css";

const Todo = (props) => {
  const [todoInput, setTodoInput] = useState("");

  const handleAdd = (e) => {
    fetch("http://localhost:3001/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoInput,
      }),
    }).catch((error) => {
      throw error;
    });
    setTodoInput(" ");
  };

  const handleDelete = (_id) => {
    fetch("http://localhost:3001/delete-todo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: _id,
      }),
    }).catch((error) => {
      throw error;
    });
  };

  return (
    <div>
      <div className="mt-5">
        <input
          placeholder="Enter a todo..."
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button
          className="btn btn-success btn-sm add-btn"
          onClick={(e) => handleAdd(e)}
        >
          Add todo
        </button>
      </div>

      {props.todoArr.map((todo, idx) => {
        return (
          <div className="">
            <div className="todo-box mt-4">
              <p key={idx} className="font-lg todo-text">
                {todo.todo}
              </p>
              <UpdateModal todo={todo.todo} _id={todo._id} />
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Todo;
