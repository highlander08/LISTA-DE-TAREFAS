import { IsNotEmpty, IsBoolean } from 'class-validator';
export class CreateTodo {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
