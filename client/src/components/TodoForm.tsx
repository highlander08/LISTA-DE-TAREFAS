import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTodo, showAlert } from "../redux/actions";
import { IAlertReducer } from "../types";
import Alert from "./Alert/Alert";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const alertState = useSelector((state: IAlertReducer) => state.alertReducer);
  //
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      dispatch(showAlert("Error the try to create the task", "warning"));
      return;
    }

    dispatch(createTodo(title));
    setTitle("");
  };
  //
  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  //
  return (
    <form onSubmit={handleSubmit}>
      {alertState.alertText.length > 0 && <Alert props={alertState} />}
      <div className="mb-3 d-flex align-items-end justify-content-between">
        <div
          className="form-group"
          style={{ width: "92%", marginRight: "10px" }}
        >
          <label htmlFor="" className="form-label">
            Add Task
          </label>
          <input
            onChange={handleChangeInputValue}
            type="text"
            className="form-control"
          />
        </div>
      </div>
      <button className="btn btn-success">Create</button>
    </form>
  );
};

export default TodoForm;
