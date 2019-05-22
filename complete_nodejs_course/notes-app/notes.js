const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();

  const isDuplicate = notes.find(note => note.title === title);
  if (!!isDuplicate) {
    // console.log(chalk.rgb(0, 0, 0).bgRed('A note with that title already exists!'));
    console.log(chalk.red.inverse('A note with that title already exists!'));
    return;
  };

  notes.push({
    title,
    body
  });
  saveNotes(notes);
  // console.log(chalk.rgb(0, 0, 0).bgGreen('Note saved!'));
  console.log(chalk.green.inverse('Note saved!'));
};

const removeNote = title => {
  const notes = loadNotes();
  const remainingNotes = notes.filter(note => note.title !== title);
  if (remainingNotes.length !== notes.length) {
    saveNotes(remainingNotes);
    console.log(chalk.rgb(0, 0, 0).bgGreen('Note removed!'))
  } else {
    console.log(chalk.rgb(0, 0, 0).bgRed('No note found!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.rgb(255, 165, 0).bold('Your notes'));

  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.green.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(
      chalk.red.bold(`A note with a title of "${title}" does not exist!`)
    );
  }
};

const saveNotes = (notes = []) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync('notes.json');
    return JSON.parse(buffer.toString());
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};

/**
 * EXTRA INFO
 *
 * const name = 'Stacey';
 *
 * const add = (x, y) => (x + y);
 *
 * exports.name = name; // OR  module.exports = name;
 * exports.add = add; // OR module.exports = add;
 *
 * THEN
 * const { name, add } = require('./myfile);
 */
