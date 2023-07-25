import { useEffect, useState } from "react";
import "./App.css";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import { Spinner } from "react-bootstrap";

const movieApi = "https://imdb-api.com/en/API/SearchMovie/k_d4zvrdtu/";
// const movieTop = "https://imdb-api.com/en/API/Top250Movies/k_d4zvrdtu";
// const movieApi = "https://kinobd.ru/api/films/";
const movieTop = "https://kinobd.ru/api/films";

function App() {
  const [movie, setMovie] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const [page, setPage] = useState("");

  const onHangleTerm = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => {
        // setMovie(res.items);
        setMovie(res.data);
        setLoading(false);
      });
  }, []);

  const onHangleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(movieApi + term)
      .then((res) => res.json())
      .then((res) => {
        if (res.results !== 0) {
          setMovie(res.results);
        } else {
          setError(true);
        }
        setLoading(false);
      });
    setTerm("");
  };

  const onNotFound = () => {
    setLoading(true);
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => {
        // setMovie(res.items);
        setMovie(res.data);
        setError(false);
        setLoading(false);
      });
  };
  const page = () => {
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <>
      <header>
        <form action="submit" onSubmit={onHangleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={term}
            onChange={onHangleTerm}
          />
        </form>
      </header>
      <div className="movies">
        {error ? (
          <NotFound onNotFound={onNotFound} />
        ) : loading ? (
          <Spinner
            animation="border"
            variant="light"
            style={{
              width: "5rem",
              height: "5rem",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
          />
        ) : (
          movie.map((elem) => <Movie key={elem.id} {...elem} />)
        )}
      </div>
      <h5>Страница {page}NEXT</h5>
    </>
  );
}

export default App;
