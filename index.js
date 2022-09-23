const button = document.querySelector("#submit");
const input = document.querySelector("#search");
const moviesSearchable = document.querySelector("#movie");
const movieContainer = document.querySelector("#movie-container");

button.addEventListener("click", (event) => {
  event.preventDefault();
  const userInput = input.value;

  if (userInput) {
    searchMovie(userInput);
  } else {
    alert("An input is required");
  }

  input.value = "";
});

function getMovie(movies, title = "") {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const header = document.createElement("h2");
  header.innerHTML = title;

  const content = document.createElement("div");
  content.classList = "content";

  const contentClose = "<p id='content-close'>close</p>";

  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);

  return movieElement;
}

function renderSearchMovies(movieData) {
  moviesSearchable.innerHTML = "";
  const movies = movieData.results;
  const movieBlock = getMovie(movies);
  moviesSearchable.appendChild(movieBlock);
}

function renderMovies(movieData) {
  const movies = movieData.results;
  const movieBlock = getMovie(movies, this.title);
  movieContainer.appendChild(movieBlock);
}

function handleError(error) {
  console.log(error);
}

function movieSection(movies) {
  const section = document.createElement("div");
  section.classList = "section";
  movies.map((movie) => {
    if (movie.poster_path) {
      const img = document.createElement("img");
      img.src = image_url + movie.poster_path;
      img.alt = movie.title;
      img.setAttribute("data-movie-id", movie.id);
      const title = document.createElement("span");
      title.classList.add("movie_title");
      const movieDivSection = document.createElement("div");
      const overview = document.createElement("span");
      overview.innerText = movie.overview;
      movieDivSection.classList.add("movie_title");
      movieDivSection.append(img, title, overview);
      title.innerHTML = `${movie.title}`;
      section.appendChild(movieDivSection);
    }
  });
  return section;
}

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 360;
  iframe.height = 315;
  iframe.allowFullscreen = true;

  return iframe;
}

function createVideoTemplate(videoData, content) {
  content.innerHTML = '<p id="content-close">close</p>';
  const videos = videoData.results;
  const length = videos.length > 3 ? 3 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

document.addEventListener("click", (event) => {
  const target = event.target;

  if (target.tagName.toLowerCase() === "img") {
    const movieId = target.dataset.movieId;
    const section = event.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add("content-display");

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=3a337c800deff9c4dfc6346a018279a7`
    )
      .then((response) => response.json())
      .then((videoData) => createVideoTemplate(videoData, content))
      .catch((error) => {
        console.log(error);
      });
  }
  if (target.id === "content-close") {
    const content = target.parentElement;
    content.innerHTML = "";;
  }
});

function myFunction() {
  const element = document.body;
  element.classList.toggle("dark");
}



// function actionMovies() {
//   const userSearch =
//     "https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=28";
//   const render = renderMovies.bind({ title: "Action" });
//   requestMovies(userSearch, render, handleError);
// }


upcomingMovies();
topRatedMovies();
nowPlayingMovies();
// actionMovies();
