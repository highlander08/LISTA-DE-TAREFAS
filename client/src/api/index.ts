import axios from "axios";
import { ITodo, ITodoState } from "../types";

export class TodoApi {
  static async createTodo(todo: Partial<ITodo>): Promise<ITodoState[]> {
    const res = await axios.post("http://localhost:3000/todos", todo);
    return res.data;
  }
  static async deleteTodo(id: string): Promise<void> {
    await axios.delete(`http://localhost:3000/todos/${id}`);
  }
  static async getTodos(): Promise<ITodoState[]> {
    const res = await axios.get("http://localhost:3000/todos");
    return res.data;
  }
  static async completeTodo(todo: Partial<ITodo>): Promise<void> {
    await axios.patch(`http://localhost:3000/todos/${todo.id}`, todo);
  }
  static async editTodo(todo: Partial<ITodo>): Promise<ITodo> {
    const res = await axios.patch(
      `http://localhost:3000/todos/${todo.id}`,
      todo
    );
    return res.data[1][0];
  }
}
