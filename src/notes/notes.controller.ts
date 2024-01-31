import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { NotesService } from './notes.service';
import { Note } from './note.model';

@Controller('notes') // localhost:3000/notes
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post() // POST /notes
  create(@Body(ValidationPipe) createNoteDto: CreateNoteDto): Note {
    return this.notesService.create(createNoteDto);
  }

  @Get() // GET /notes
  findAll(): Note[] {
    return this.notesService.findAll();
  }

  @Get(':id') // GET /notes/:id
  findOne(@Param('id', ParseIntPipe) id: number): Note {
    return this.notesService.findOne(id);
  }

  @Put(':id') // PUT /notes/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateNoteDto: UpdateNoteDto,
  ): Note {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id') // DELETE /notes/:id
  delete(@Param('id', ParseIntPipe) id: number): Note {
    return this.notesService.delete(id);
  }
}
