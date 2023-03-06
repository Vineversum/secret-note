import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AppService } from './app.service';
import { CreateNoteDto } from "@app/dto/create-note.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {

  }

  @Get(':uri')
  getNote(@Param('uri') uri: string) {
    return this.appService.getNote(uri);
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.appService.createNote(createNoteDto);

  }
}
