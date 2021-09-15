module.exports = {
  shuffle: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },
  occurences: function (tags, uploads, top) {
    let frequency = [];
    let index = [];
    let trend = [];

    for (let i = 0; i < tags.length; i++) {
      let counter = 0;

      for (let j = 0; j < uploads.length; j++) {
        if (tags[i] == uploads[j]) {
          counter++;
        }
      }
      frequency.push(counter);
    }
    for (let i = 0; i < top; i++) {
      index.push(frequency.indexOf(Math.max(...frequency)));
      frequency[frequency.indexOf(Math.max(...frequency))] = 0;
      trend.push(tags[index[i]]);
    }

    return trend;
  },
};
