const Generation = require('./generation');

const generation = new Generation();

console.log('Generation: ', generation);

const gooby = generation.createDragon();
console.log('Gooby dragon: ', gooby);

setTimeout(() => {
  const mimar = generation.createDragon();
  console.log('mimar dragon: ', mimar);
}, 15000);
