/* eslint-disable prettier/prettier */
import { Get, Controller, Param } from '@nestjs/common';
import {
  Body,
  Header,
  HttpCode,
  Patch,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { CreateTodo } from './dto/create-todo.dto';
import { ChangeTodo } from './dto/todo.dto';
import { Todo } from './models/todo.model';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  getAllTodos() {
    return this.todoService.findAll();
  }
  @Get(':id')
  getOneTodo(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-Type', 'application/json')
  createTodo(@Body() createTodo: CreateTodo) {
    return this.todoService.create(createTodo);
  }
  @Patch(':id')
  changeTodo(@Body() changeTodo: ChangeTodo, @Param('id') id: string) {
    return this.todoService.update(id, changeTodo);
  }
  @Delete(':id')
  deleteTodo(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
