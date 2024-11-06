const rawData = ['ID:"thing"', 'Origin:"thing"', 'Destination:"thing"', 'Shipping:"thing"', 'Pieces:"thing"'];
const itemsToRemove = ['ID', 'Origin','Destination','Shipping','Pieces'];

const cleanedData = rawData.map(item => {
  let cleanedItem = item;
  itemsToRemove.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g'); // Create a regex to match the word
    cleanedItem = cleanedItem.replace(regex, ''); // Remove the word
  });
  return cleanedItem.trim(); // Trim any extra spaces
});

console.log('Cleaned Data:', cleanedData);
