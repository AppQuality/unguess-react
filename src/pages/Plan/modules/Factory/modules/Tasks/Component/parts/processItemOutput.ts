// Helper function to process module item output for better readability in the AI prompt
export const processItemOutput = (item: any): any => {
  if (Array.isArray(item)) {
    // If it's an array, process each item in the array
    return item.map((subItem) => processItemOutput(subItem));
  }
  if (typeof item === 'object' && item !== null) {
    // recursively process nested values
    return Object.fromEntries(
      Object.entries(item)
        // here we can filter out any keys we don't want to include in the prompt, for example 'id'
        .filter(([key]) => key !== 'id')
        .map(([key, value]) => [key, processItemOutput(value)])
    );
  }
  return item;
};
