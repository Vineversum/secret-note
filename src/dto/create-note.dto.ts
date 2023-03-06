import { IsIn, IsOptional, MinLength } from "class-validator";
import milliseconds from "@app/utils/milliseconds";

export class CreateNoteDto {
  @MinLength(1)
  message: string;

  @IsIn(Object.keys(milliseconds))
  @IsOptional()
  lifetime?: string;
}