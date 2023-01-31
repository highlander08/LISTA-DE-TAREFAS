import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { completeTodo, deleteTodo, editTodo } from "../../redux/actions";
import { ITodoReducer } from "../../types";
import { TodoItem } from "../TodoItem/TodoItem";
// import { TodoItem } from "../TodoItem";
import "./styles.css";
//
const TodoList = () => {
  const state = useSelector((state: ITodoReducer) => state.todoReducer);
  //
  const dispatch = useDispatch();
  //
  const changeTodo = (title: string, done: boolean, id: string) => {
    dispatch(editTodo(id, done, title));
  };
  //
  const removeTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
  //
  const doneTodo = (id: string, done: boolean) => {
    dispatch(completeTodo(id, done));
  };
  return (
    <TransitionGroup component="ul" className="list-group">
      {state.todos.map((todo) => (
        <CSSTransition timeout={800} classNames={"todo"} key={todo.id}>
          <TodoItem
            todo={todo}
            deleteTodo={removeTodo}
            doneTodo={doneTodo}
            changeTodo={changeTodo}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default TodoList;
