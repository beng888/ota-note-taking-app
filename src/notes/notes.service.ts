import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from './note.dto';
import { Note } from './note.model';

@Injectable()
export class NotesService {
  private notes: Note[] = [];

  create(createNoteDto: CreateNoteDto): Note {
    const notesByHighestId = this.notes.sort((a, b) => b.id - a.id);
    const id = (notesByHighestId[0]?.id ?? 0) + 1;
    const newNote: Note = { id, ...createNoteDto };
    this.notes.push(newNote);

    return newNote;
  }

  findAll(): Note[] {
    return this.notes;
  }

  findOne(id: number): Note {
    const note = this.notes.find((note) => note.id === id);

    if (!note) throw new NotFoundException('Note Not Found');

    return note;
  }

  update(id: number, updateNoteDto: UpdateNoteDto): Note {
    this.notes = this.notes.map((note) => {
      if (note.id === id) {
        return { ...note, ...updateNoteDto };
      }
      return note;
    });

    return this.findOne(id);
  }

  delete(id: number): Note {
    const removedNote = this.findOne(id);
    this.notes = this.notes.filter((note) => note.id !== id);

    return removedNote;
  }
}
