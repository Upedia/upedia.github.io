// Select the input, button, and results container
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('search-results');

// Fetch and load the JSON data
let fileData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    fileData = data;
  })
  .catch(error => console.error('Error loading JSON file:', error));

// Function to search the data
function searchFiles(query) {
  const lowerCaseQuery = query.toLowerCase();
  const results = fileData.filter(file => 
    file.title.toLowerCase().includes(lowerCaseQuery) ||
    file.content.toLowerCase().includes(lowerCaseQuery)
  );
  return results;
}

// Function to display search results
function displayResults(results) {
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for<b> ${searchInput.value}</b></p>`;
    return;
  }

  results.forEach(result => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('result');
    resultElement.innerHTML = `
      <h2>${result.title}</h2>
      <p>${result.content}</p>
    `;
    resultsContainer.appendChild(resultElement);
  });
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const query = searchInput.value;
  if (query) {
    const searchResults = searchFiles(query);
    displayResults(searchResults);
  }
});

// Optional: Search as you type
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  if (query) {
    const searchResults = searchFiles(query);
    displayResults(searchResults);
  } else {
    resultsContainer.innerHTML = '';
  }
});
