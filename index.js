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
movies.forEach(async movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const title = document.createElement('h2');
    title.textContent = movie.Title;

    const movieDetails = await fetchMovieDetails(movie.imdbID);

    const year = document.createElement('p');
    year.textContent = `Year: ${movie.Year}`;

    const imdbLink = document.createElement('a');
    imdbLink.textContent = 'IMDb';
    imdbLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
    imdbLink.target = '_blank';
    imdbLink.rel = 'noopener noreferrer';

    const poster = document.createElement('img');
    poster.src = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;
    poster.alt = movie.Title;
movieCard.appendChild(title);
    movieCard.appendChild(year);
    movieCard.appendChild(imdbLink);
    movieCard.appendChild(poster);

    moviesContainer.appendChild(movieCard);
  });
}
searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    const movies = await fetchMovies(searchTerm);
    displayMovies(movies);
  }
});
