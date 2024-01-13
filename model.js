class Group {
  constructor(name) {
    this.name = name;
    this.notes = [];
  }
  // note : { title: string, about?: string }
  addNote(note) {
    if (note.title) {
      const newNote = new Note(note);
      this.notes.push(newNote);
    }
  }

  // id : order number in NOTES
  removeNote(id) {
    this.notes.splice(id, 1);
  }

  //  id : order number in NOTES - note : { title: string, about?: string }
  insertNote(id, note) {
    this.notes.splice(id, 1, note);
  }

  swapNotes(firstId, secId) {
    // const note = this.notes[firstId]
    // this.notes[firstId] = this.notes[secId]
    // this.notes[secId] = note
    [this.notes[firstId], this.notes[secId]] = [
      this.notes[secId],
      this.notes[firstId],
    ];
  }

  editNoteTitle(id, title) {
    this.notes[id].changeTitle(title);
  }

  editNoteAbout(id, about) {
    this.notes[id].changeAbout(about);
  }
}

// note objektumot - note : { title: string, about?: string }
class Note {
  constructor(note) {
    this.title = note.title;
    this.about = note.about ? note.about : null;
  }
  // newTitle - string
  changeTitle(newTitle) {
    this.title = newTitle;
  }

  // newAbout - string
  changeAbout(newAbout) {
    this.about = newAbout;
  }
}

export default Group;
