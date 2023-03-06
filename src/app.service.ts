import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@app/prisma.service";
import { CreateNoteDto } from "@app/dto/create-note.dto";
import makeId from "@app/utils/makeid";
import expInMilliSec from "@app/utils/expInMilliSec";

const AES = require("crypto-js/aes");
const encodingStrategy = require("crypto-js").enc.Utf8;


@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {
  }


  async createNote(createNoteDto: CreateNoteDto) {
    const id = makeId(12);
    const key = makeId(12);
    const { lifetime } = createNoteDto;
    const cypherMessage = AES.encrypt(createNoteDto.message, key).toString();
    const note = await this.prisma.note.create({
      data: {
        id,
        message: cypherMessage,
        expiresAt: lifetime ? new Date(Date.now() + expInMilliSec[lifetime]) : null
      }
    });

    return { note, uri: `${id}${key}` };
  }

  async getNote(uri: string) {
    const id = uri.slice(0, 12);
    const key = uri.slice(12, 24);
    const note = await this.prisma.note.findUnique({ where: { id } });

    const decrypted = note ? AES.decrypt(note.message, key).toString(encodingStrategy) : "";


    if (note && decrypted) {
      await this.prisma.note.delete({ where: { id } });
      return { decrypted };
    } else {
      throw new NotFoundException("Note either never existed or has already been viewed");
    }
  }


}
