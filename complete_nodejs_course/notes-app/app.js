const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

// customize yargs version. Otherwise, it will default to `v1.0.0`
// Test this by running: `node app.js --version`
yargs.version('13.2.2');

/**
 * create add command
 * Running `node app.js --help` after creating the command will add a `Commands` section (test by `console.log(yargs.argv)`)
 */
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'The note content',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Delete a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.removeNote(argv.title);
  }
});

// Create list command
yargs.command({
  command: 'list',
  describe: 'Listing notes',
  handler: () => {
    notes.listNotes();
  }
});

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title);
  }
});

yargs.parse(); // to parse the arguments

// const command = process.argv[2];
// console.log(yargs.argv);

// if (command === 'add') {
//   console.log(chalk.bold.italic.green('Adding note'));
// }



/**
 * `console.log(process.argv)` prints an array of values which entailed:
 * - process.argv[0]: the path to the node executable in the machine
 * - process.argv[1]: the path to the executed file
 * - process.argv[2]: from index 2 onwards, the values will be what is provided via the command line
 */
