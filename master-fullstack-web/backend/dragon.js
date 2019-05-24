const TRAITS = require('./traits');

const DEFAULT_PROPERTIES = {
  nickname: 'unnamed',
  get birthdate() {
    return new Date();
  },
  get randomTraits() {
    const traits = [];

    TRAITS.forEach(trait => {
      const traitType = trait.type;
      const traitValues = trait.values;

      const index = Math.floor(
        Math.random() * traitValues.length
      );
      const traitValue = traitValues[index];

      traits.push({
        traitType,
        traitValue
      });
    });

    return traits;
  }
};

class Dragon {
  constructor({ birthdate, nickname, traits } = {}) {
    this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
    this.nickname = nickname || DEFAULT_PROPERTIES.nickname;
    this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
  }
}

module.exports = Dragon;
