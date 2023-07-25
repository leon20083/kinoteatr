const Movie = ({ small_poster, name_russian, year, current_page }) => {
  return (
    <div className="movie_block">
      <div className="img-wrap">
        <img src={small_poster} alt={name_russian} />
      </div>
      <h3>
        <a href="">
          {name_russian}, ({year})
        </a>
      </h3>
    </div>
  );
};

export default Movie;
