const User = require("../models/User.model");

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

    tags.forEach((elem) => {
      let counter = 0;
      uploads.forEach((item) => {
        if (elem == item) {
          counter++;
        }
      });
      frequency.push(counter);
    });

    for (let i = 0; i < top; i++) {
      index.push(frequency.indexOf(Math.max(...frequency)));
      frequency[frequency.indexOf(Math.max(...frequency))] = 0;
      trend.push(tags[index[i]]);
    }

    return trend;
  },
  compareRole: (user) => user?.role === "AGENT" || user?.role === "ARCHITECT",
  isARCHITECT: (user) => user?.role === "ARCHITECT",
};
