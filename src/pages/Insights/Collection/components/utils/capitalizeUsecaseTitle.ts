export const capitalizeUsecaseTitle = (title: string) => {
  const words = title.split(' ');
  const transformedWords = words.map((word) => {
    if (word.toLowerCase() === 'use') {
      return 'Use';
    }
    if (word.toLowerCase() === 'case') {
      return 'Case';
    }
    return word;
  });
  return transformedWords.join(' ');
};
