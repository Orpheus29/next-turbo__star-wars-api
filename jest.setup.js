import '@testing-library/jest-dom';

const { defaults } = require("jest-config");
module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};
