import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateModal(props) {
  const [show, setShow] = useState(false);
  const [todoEdit, setTodoEdit] = useState(props.todo);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUpdate = () => {
    fetch("http://localhost:3001/update-todo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: props._id,
        todo: todoEdit,
      }),
    }).catch((error) => {
      throw error;
    });
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-sm">
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="input"
            placeholder="Update todo ... "
            value={todoEdit}
            onChange={(e) => setTodoEdit(e.target.value)}
          />
          <button
            className="btn btn-success btn-sm add-btn"
            onClick={handleUpdate}
          >
            Update done
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UpdateModal;
