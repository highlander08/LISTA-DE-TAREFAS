import { call, Effect, put, takeEvery } from "redux-saga/effects";
import {
  ICompleteAction,
  ICreateAction,
  IEditAction,
  ITodo,
  ITodoActionTypes,
} from "../../types";
import { TodoApi } from "../../api/index";
import { hideAlert, showAlert } from "../actions";

function* sagaCreateTodo(action: ICreateAction): Generator<Effect, void> {
  try {
    const todoObject: Partial<ITodo> = {
      title: action.payload,
      done: false,
    };
    const todo = yield call(TodoApi.createTodo, todoObject);

    yield put({ type: ITodoActionTypes.CREATE_TODO_SUCCESS, payload: todo });
    yield put(showAlert("Task created successfully", "success"));
    yield call(delay, 3000);
    yield put(hideAlert());
  } catch (error) {
    yield put(showAlert(`Task failed try again ${error}`, "warning"));
  }
}
function* sagaDeleteTodo(action: ICreateAction): Generator<Effect, void> {
  try {
    yield call(TodoApi.deleteTodo, action.payload);
    yield put(showAlert("Task deleted ", "success"));
    yield call(delay, 3000);
    yield put(hideAlert());
    yield put({
      type: ITodoActionTypes.DELETE_TODO_SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put(showAlert(`Task failed try again ${error}`, "warning"));
  }
}
function* sagaGetTodos(): Generator<Effect, void, ITodo[]> {
  try {
    const todo = yield call(TodoApi.getTodos);
    yield put(showAlert("Task Available ", "success"));
    yield call(delay, 3000);
    yield put(hideAlert());
    yield put({ type: ITodoActionTypes.GET_TODOS_SUCCESS, payload: todo });
  } catch (error) {
    yield put(
      showAlert(`Task is error Get Tasks try again ${error}`, "warning")
    );
  }
}
function* sagaCompleteTodo(
  action: ICompleteAction<ITodo>
): Generator<Effect, void, ITodo[]> {
  try {
    const todoObject: Partial<ITodo> = {
      done: action.payload.done,
      id: action.payload.id,
    };
    yield call(TodoApi.completeTodo, todoObject);
    yield put(
      showAlert(
        `Task Complete ${action.payload.done ? "Okay" : "pending"}`,
        "success"
      )
    );
    yield call(delay, 3000);
    yield put(hideAlert());
    yield put({
      type: ITodoActionTypes.COMPLETE_TODO_SUCCESS,
      payload: action.payload.id,
    });
  } catch (error) {
    yield put(
      showAlert(`Task failed don´t complete try again ${error}`, "warning")
    );
  }
}
function* sagaEditTodo(action: IEditAction): Generator<Effect, void, ITodo> {
  try {
    const todoObject: Partial<ITodo> = {
      done: action.payload.done,
      id: action.payload.id,
      title: action.payload.title,
    };
    const todo = yield call(TodoApi.editTodo, todoObject);
    yield put(showAlert("Task Edit success", "success"));
    yield call(delay, 3000);
    yield put(hideAlert());
    yield put({
      type: ITodoActionTypes.EDIT_TODO_SUCCESS,
      payload: todo,
      id: action.payload.id,
    });
  } catch (error) {
    yield put(showAlert(`Task failed an Edit try again ${error}`, "warning"));
  }
}
const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function* sagaWatcher(): Generator<Effect, void> {
  yield takeEvery(ITodoActionTypes.CREATE_TODO, sagaCreateTodo);
  yield takeEvery(ITodoActionTypes.DELETE_TODO, sagaDeleteTodo);
  yield takeEvery(ITodoActionTypes.GET_TODOS, sagaGetTodos);
  yield takeEvery(ITodoActionTypes.COMPLETE_TODO, sagaCompleteTodo);
  yield takeEvery(ITodoActionTypes.EDIT_TODO, sagaEditTodo);
}
