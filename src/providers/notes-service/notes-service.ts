import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {Note} from "../../app/note";

@Injectable()
export class NotesServiceProvider {
  notes: Note[] = [];

  constructor(public storage: Storage) {
    storage.get("notaker.notes").then(
      notes => this.notes = notes.filter(note => note != null)
    );
  }

  addNote(note: Note): Promise<Note[]> {
    this.notes.push(note);
    return this.storage.set("notaker.notes", this.notes)
      .then(notes => notes);
  }

  deleteNote(noteNumber: number) {
    delete this.notes[noteNumber];
    this.notes = this.notes.filter(note => note != null);
    this.storage.set("notaker.notes", this.notes)
  }
}
