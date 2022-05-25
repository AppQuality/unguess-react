module.exports = {
  '*.{ts,tsx}': (filenames) => ['yarn format:fix', 'yarn validate'],
};
