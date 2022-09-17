const apiKey = "3a337c800deff9c4dfc6346a018279a7";

const search_api =
  "https://api.themoviedb.org/3/search/movie?api_key=3a337c800deff9c4dfc6346a018279a7";
const image_url = "https://image.tmdb.org/t/p/w500";

function requestMovies(userSearch, onComplete, onError) {
  fetch(userSearch)
    .then((response) => response.json())
    .then(onComplete)
    .catch(onError);
}

function searchMovie(userInput) {
  const userSearch = "https://api.themoviedb.org/3/search/movie?api_key=3a337c800deff9c4dfc6346a018279a7&query=" + userInput;
  requestMovies(userSearch, renderSearchMovies, handleError);
}

function upcomingMovies() {
  const userSearch = "https://api.themoviedb.org/3/movie/upcoming?api_key=3a337c800deff9c4dfc6346a018279a7";
  const render = renderMovies.bind({ title: "Upcoming" });
  requestMovies(userSearch, render, handleError);
}

function topRatedMovies() {
  const userSearch = "https://api.themoviedb.org/3/movie/top_rated?api_key=3a337c800deff9c4dfc6346a018279a7";
  const render = renderMovies.bind({ title: "Top Rated" });
  requestMovies(userSearch, render, handleError);
}

function nowPlayingMovies() {
  const userSearch = "https://api.themoviedb.org/3/movie/now_playing?api_key=3a337c800deff9c4dfc6346a018279a7";
  const render = renderMovies.bind({ title: "Now Playing" });
  requestMovies(userSearch, render, handleError);
}