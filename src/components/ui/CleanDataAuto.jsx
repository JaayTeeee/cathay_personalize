const rawData = ['MAWB:"thing"', 'HAWB:"thing"', 'DEPT:"thing"', 'DEST:"thing"', 'PCS:"thing"'];
const itemsToRemove = ['MAWB', 'HAWB'];

const cleanedData = rawData.map(item => {
  let cleanedItem = item;
  itemsToRemove.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'g'); // Create a regex to match the word
    cleanedItem = cleanedItem.replace(regex, ''); // Remove the word
  });
  return cleanedItem.trim(); // Trim any extra spaces
});

console.log('Cleaned Data:', cleanedData);
