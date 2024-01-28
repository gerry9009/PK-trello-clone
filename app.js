import Group from "./model.js";

const $groupContainer = document.querySelector(".js-group-container");

const GROUP_LIST = [];

const group1 = new Group("Első cím");
const group3 = new Group("Harmadik cím");
const group2 = new Group("Második cím");
const group4 = new Group("Negyedik cím");

group1.addNote({ title: "Új jegyzet" });
group1.addNote({ title: "Új jegyzet-2" });
group1.addNote({ title: "Új jegyzet-3" });
group1.addNote({ title: "Új jegyzet-4" });
group2.addNote({ title: "Új jegyzet-5" });
group3.addNote({ title: "Új jegyzet-6" });
group4.addNote({ title: "Új jegyzet-7" });
group3.addNote({ title: "Új jegyzet-8" });
group3.addNote({ title: "Új jegyzet-9" });

GROUP_LIST.push(group1);
GROUP_LIST.push(group2);
GROUP_LIST.push(group3);
GROUP_LIST.push(group4);

console.log(GROUP_LIST);

// mozgatott elem tulajdonságai

// noteId -> tömbön belüli sorszám (group.note)
// containGroup -> group GROUP_LIST-en belüli sorszáma
// note -> note : { title, about }
// pageY -> dragend esmény során tudjuk kinyerni
const droppedNote = {};

function resetDroppedNote() {
  droppedNote.noteId = null;
  droppedNote.groupId = null;
  droppedNote.note = null;
  droppedNote.pageY = null;
}

function dropGroupEventHandler(event, targetGroupId) {
  if (targetGroupId !== droppedNote.groupId) {
    const currentGroup = GROUP_LIST[droppedNote.groupId];
    const targetGroup = GROUP_LIST[targetGroupId];

    currentGroup.removeNote(droppedNote.noteId);
    targetGroup.addNote(droppedNote.note);
  }

  resetDroppedNote();
  render();
}

function dragEventHandler(event, note, noteId, groupId) {
  droppedNote.noteId = noteId;
  droppedNote.groupId = groupId;
  droppedNote.note = note;
  droppedNote.pageY = event.pageY - event.target.offsetHeight / 2;
}

function createGroupElement(name, targetGroupId) {
  // div HTML elemet
  const groupElement = document.createElement("div");
  // megadjuk a group nevét
  groupElement.innerHTML = `<h2>${name}</h2>`;

  // osztályok hozzáadása
  groupElement.classList = "group";
  // eseményfigyelők
  // dragenter - dragover -dragleave - drop
  groupElement.addEventListener("dragover", (event) => {
    event.preventDefault();
  });

  groupElement.addEventListener("drop", (event) => {
    dropGroupEventHandler(event, targetGroupId);
  });
  // visszaadjuk a létrehozott elemet
  return groupElement;
}

function createNoteElement(note, noteIndex, groupIndex) {
  // div HTML elemet
  const noteElement = document.createElement("div");
  // megadjuk a group nevét
  noteElement.innerHTML = `<h3>${note.title}</h3>`;

  // dragabble attribútumot true-ra kell állítani
  noteElement.draggable = true;

  // osztályok hozzáadása
  noteElement.classList = "note";
  // eseményfigyelők
  // dragstart - drag - dragend
  noteElement.addEventListener("drag", (event) => {
    dragEventHandler(event, note, noteIndex, groupIndex);
  });

  // visszaadjuk a létrehozott elemet
  return noteElement;
}

function render() {
  $groupContainer.innerHTML = "";
  // végig kell iterálni a GROUP_LIST
  GROUP_LIST.map((group, groupIndex) => {
    const groupElement = createGroupElement(group.name, groupIndex);
    const notesArray = group.notes;

    notesArray.map((note, noteIndex) => {
      const noteElement = createNoteElement(note, noteIndex, groupIndex);

      groupElement.appendChild(noteElement);
    });

    $groupContainer.appendChild(groupElement);
  });
}

resetDroppedNote();
render();
