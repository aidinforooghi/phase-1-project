const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const moviesContainer = document.getElementById('movies-container');

// Function to fetch movie data from the API
async function fetchMovies(searchTerm) {
  const apiKey = '2c6a402c'; 
  const url = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.Search;
  } catch (error) {
    console.log('Error:', error);
  }
}
// Function to fetch detailed movie information from the API
async function fetchMovieDetails(imdbID) {
  const apiKey = '2c6a402c'; 
  const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
}
// Function to display movie data 
function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  if (!movies) {
    const message = document.createElement('p');
    message.textContent = 'No movies found.';
    moviesContainer.appendChild(message);
    return;
  }
