import { Body, Controller, Delete, Get, Param, Post, Query, Render, UsePipes, ValidationPipe } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateNoteDto } from "@app/dto/create-note.dto";
import formatDate from "@app/utils/formatDate";
import * as process from "process";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  @Render("create")
  getHello() {

  }

  @Get(":uri")
  @Render("show")
  async showDecrypted(@Param("uri") uri: string, @Query('show') show: boolean) {
    try {
      if(show) {
        const { decrypted } = await this.appService.findNote(uri, show);
        return {
          decrypted
        }
      }
      else {
        await this.appService.findNote(uri);
        return { uri };
      }
    } catch (error) {
      return { error }
    }
  }

  @Post("link")
  @Render("link")
  @UsePipes(new ValidationPipe())
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    const { url, expiresAt } = await this.appService.createNote(createNoteDto);
    return {
      url,
      expiresAt: expiresAt ? formatDate(expiresAt) : null
    };
  }

  @Post(':uri')
  @Render('deleted')
  async destroy(@Param('uri') uri: string) {
    const { found } = await this.appService.deleteNote(uri);
    return { deleted: found }
  }
}
