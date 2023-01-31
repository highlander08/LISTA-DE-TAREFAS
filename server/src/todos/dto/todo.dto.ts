import { IsNotEmpty, IsBoolean } from 'class-validator';
export class ChangeTodo {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  done: boolean;
}
