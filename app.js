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

function renderGroup(name) {
  // div HTML elemet
  const groupElement = document.createElement("div");
  // megadjuk a group nevét
  groupElement.innerHTML = `<h2>${name}</h2>`;

  // osztályok hozzáadása
  groupElement.classList = "group";
  // eseményfigyelők
  // dragenter - dragover -dragleave - drop

  // visszaadjuk a létrehozott elemet
  return groupElement;
}

function renderNote(note) {
  // div HTML elemet
  const noteElement = document.createElement("div");
  // megadjuk a group nevét
  noteElement.innerHTML = `<h3>${note.title}</h3>`;

  // dragabble attribútumot true-ra kell állítani
  noteElement.draggable = true;

  // osztályok hozzáadása
  noteElement.classList = "note";
  // eseményfigyelők
  // dragenter - dragover -dragleave - drop

  // visszaadjuk a létrehozott elemet
  return noteElement;
}

function render() {
  // végig kell iterálni a GROUP_LIST
  GROUP_LIST.map((group) => {
    const groupElement = renderGroup(group.name);

    const notesArray = group.notes;

    notesArray.map((note) => {
      const noteElement = renderNote(note);

      groupElement.appendChild(noteElement);
    });

    $groupContainer.appendChild(groupElement);
  });
}

render();
