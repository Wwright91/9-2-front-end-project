fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3a337c800deff9c4dfc6346a018279a7&page=1')
  .then((response) => response.json())
  .then((json) => {
   console.log(json);
  })
  .catch((error) => {
    console.log(error);
  });