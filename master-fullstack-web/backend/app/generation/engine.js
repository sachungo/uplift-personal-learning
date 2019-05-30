const Generation = require('./');

class GenerationEngine {
  constructor() {
    this.generation = null;
    this.timer = null;
  }

  start() {
    this.createNewGeneration();
  }

  stop() {
    clearTimeout(this.timer);
  }

  createNewGeneration() {
    this.generation = new Generation();
    console.log('Generation: ', this.generation);

    const timeoutMS = this.generation.expiration.getTime() - Date.now();

    // call createNewGeneration recursively
    this.timer = setTimeout(
      () => this.createNewGeneration(),
      timeoutMS
    );
  }
}

module.exports = GenerationEngine;
