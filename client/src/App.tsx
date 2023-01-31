import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import { getTodos } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container pt-3">
            <TodoForm />
            <h2 className="pt-3">LIST TASKS</h2>
            <TodoList />
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
