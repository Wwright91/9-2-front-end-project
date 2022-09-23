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
      // section.appendChild(text);
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
    content.innerHTML = "";
    // content.classList.remove("content-display");
  }
});

function myFunction() {
  const element = document.body;
  element.classList.toggle("dark");
}

// const movieGenres = "https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=28"

function actionMovies() {
  const userSearch =
    "https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=28";
  const render = renderMovies.bind({ title: "Action" });
  requestMovies(userSearch, render, handleError);
}

// const dropList = document.querySelector("#dropList")

// dropList.addEventListener("submit", (event) => {
//   event.preventDefault()
//   const dropdownList = document.querySelector(".dropdownList")
//   console.log("drop", dropdownList.value)
//   if (dropdownList.value === "action") {
//   document.querySelector("#movie-container").style.display = "none";
//     // movieContainer.style.display("none")
//     const userSearch = "https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=28";
//   const render = renderMovies.bind({ title: "Action" });
//  requestMovies(userSearch, render, handleError);

//   //     const genres = document.getElementById("genre")
//   // genres.append(newGenre)
//   }

// })

// const genreNameObj = {}
// let genreObj = {}

// const genresList = "https://api.themoviedb.org/3/genre/movie/list?api_key=3a337c800deff9c4dfc6346a018279a7"
// console.log(genresList)

// fetch(genresList)
//   .then((res) => res.json())
//   .then((genres) => {
//    genreObj = genres
// console.log("genres", genreObj)
//   // const allGenres = genres.map(g => g.name)
//   // console.log("genreobj", allGenres)

//     for (let g in genreObj) {
//       genreNameObj[g.name] = genreNameObj[g.name] + 1 || 1
//     }
//     console.log(genreNameObj)

// for (let genre in genreObj) {
//   console.log("genre", genre)
//   // const genreNames = genres.name
//   const dropdownList = document.querySelector("#dropdown")
//   const allGenres = document.createElement("option")

//   allGenres.setAttribute("value", genre)
//   allGenres.textContent = genre
//   console.log("allgenres", allGenres)
//   dropdownList.append(allGenres)

// }
// })
// .catch(err => {
//   console.log(err)
// })

const genresList =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=3a337c800deff9c4dfc6346a018279a7";
// console.log(genresList);
const movieIdMatch =
  "https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=";

// const form = document.querySelector("#dropList");
// console.log(form)

/**fetch genres and grab all ids, connect the ids with the id for the genres */

fetch(genresList)
  .then((res) => res.json())
  .then((movieGenres) => {
    console.log(movieGenres.genres);
    const dropdownList = document.querySelector(".dropdownList");

    for (let i = 0; i < movieGenres.genres.length; i++) {
      const movieNames = movieGenres.genres[i].name;
      const movieIdTag = movieGenres.genres[i].id;

      const option = document.createElement("option");
      option.setAttribute("value", movieIdTag);
      option.innerText = movieNames;
      dropdownList.append(option);
    }

    dropdownList.addEventListener("change", (event) => {
      console.log(event.target.value);
      fetch(movieIdMatch + event.target.value)
        .then((res) => res.json())
        .then(
          (movieGenres) => {
            console.log(movieGenres.results);

            // for (let i = 0; i < movieGenres.results.length; i++) {
            //   const videoIds = movieGenres.results[i].id;
            //   console.log(videoIds);

            //   fetch(
            //     `https://api.themoviedb.org/3/movie/${videoIds}/videos?api_key=3a337c800deff9c4dfc6346a018279a7`
            //   )
            //     .then((res) => res.json())
            //     .then((genreVideo) => {
            //       console.log(genreVideo.results);

            for (let i = 0; i < movieGenres.results.length; i++) {
              // const movieKey = movieGenres.results[i].key;
              // console.log(movieKey);

              const userSearch =
                `https://api.themoviedb.org/3/discover/movie?api_key=3a337c800deff9c4dfc6346a018279a7&with_genres=${movieIdTag}`;
              const render = renderMovies.bind({ title: movieGenres.results[i].title });
              requestMovies(userSearch, render, handleError);




              // const videoFrame = document.createElement("iframe");
              // videoFrame.src =
              //   "https://www.youtube.com/embed/${movieKey}"
              // ;
              // videoFrame.width = 360;
              // videoFrame.height = 315;
              // videoFrame.allowFullscreen = true
              // const videoDiv = document.createElement("div");
              // videoDiv.append(videoFrame);
              // movieContainer.innerHTML = "";
              // movieContainer.append(videoDiv);
            }
          });
    
  }
)}

          // iframe.src = `https://www.youtube.com/embed/${video.key}`;
          // iframe.width = 360;
          // iframe.height = 315;
          // iframe.allowFullscreen = true;

          // createIframe(videoIds)

          //grab movie ids then fetch https://api.themoviedb.org/3/movie/579974/videos?api_key=3a337c800deff9c4dfc6346a018279a7
        )

        .catch((err) => console.log(err));
    // });
  // });

// "
// "id": 28,
// "name": "Action"
// },
// {
// "id": 12,
// "name": "Adventure"
// },
// {
// "id": 16,
// "name": "Animation"
// },
// {
// "id": 35,
// "name": "Comedy"
// },
// {
// "id": 80,
// "name": "Crime"
// },
// {
// "id": 99,
// "name": "Documentary"
// },
// {
// "id": 18,
// "name": "Drama"
// },
// {
// "id": 10751,
// "name": "Family"
// },
// {
// "id": 14,
// "name": "Fantasy"
// },
// {
// "id": 36,
// "name": "History"
// },
// {
// "id": 27,
// "name": "Horror"
// },
// {
// "id": 10402,
// "name": "Music"
// },
// {
// "id": 9648,
// "name": "Mystery"
// },
// {
// "id": 10749,
// "name": "Romance"
// },
// {
// "id": 878,
// "name": "Science Fiction"
// },
// {
// "id": 10770,
// "name": "TV Movie"
// },
// {
// "id": 53,
// "name": "Thriller"
// },
// {
// "id": 10752,
// "name": "War"
// },
// {
// "id": 37,
// "name": "Western""

upcomingMovies();
topRatedMovies();
nowPlayingMovies();
// actionMovies();
