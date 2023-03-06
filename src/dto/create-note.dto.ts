import { IsIn, IsOptional, MinLength } from "class-validator";
import expInMilliSec from "@app/utils/expInMilliSec";

export class CreateNoteDto {
  @MinLength(1)
  message: string;

  @IsIn(Object.keys(expInMilliSec))
  @IsOptional()
  lifetime?: string;
}