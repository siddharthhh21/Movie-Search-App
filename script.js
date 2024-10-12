const apiKey = '374a652f';  // Your OMDb API key
const movieInput = document.getElementById('movie-input');
const searchButton = document.getElementById('search-button');
const movieDetails = document.getElementById('movie-details');

searchButton.addEventListener('click', searchMovie);

function searchMovie() {
  const movieTitle = movieInput.value.trim();

  if (movieTitle === '') {
    alert('Please enter a movie name.');
    return;
  }

  // Fetch movie data from OMDb API
  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`)
    .then(response => response.json())
    .then(data => displayMovieDetails(data))
    .catch(error => console.error('Error fetching movie data:', error));
}

function displayMovieDetails(movie) {
  if (movie.Response === 'False') {
    movieDetails.innerHTML = `<p>Movie not found. Please try again.</p>`;
    return;
  }

  const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : 'default-poster.jpg';  // Default poster if no image available
  const movieInfoHTML = `
    <div class="clearfix">
      <img src="${posterUrl}" alt="${movie.Title}">
      <div class="movie-info">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Rating:</strong> ${movie.imdbRating}</p>
        <p><strong>Released:</strong> ${movie.Released}</p>
        <p><strong>Plot:</strong> ${movie.Plot}</p>
        <p><strong>Genre:</strong> ${movie.Genre}</p>
        <p><strong>Director:</strong> ${movie.Director}</p>
      </div>
    </div>
  `;

  movieDetails.innerHTML = movieInfoHTML;
}
