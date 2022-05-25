module.exports = {
  'src/**/*.{js,jsx,ts,tsx,json,css,scss,md}': (filenames) => [
    'yarn format:fix',
    'yarn lint',
    'yarn type:check',
    'yarn format:check',
  ],
};
