import "./App.css";
import Movie from "../Movie";
import { useState, useEffect } from "react";
import NotFound from "../NotFound";
import { Spinner } from "react-bootstrap";

const movieApi = "https://imdb-api.com/en/API/SearchMovie/k_0i6h97yb/";
const movieTop = "https://imdb-api.com/en/API/Top250Movies/k_0i6h97yb";

function App() {
  const [movie, setMovie] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onHandleTerm = (e) => {
    setTerm(e.target.value);
  };

  useEffect(() => {
    fetch(movieTop)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.items);
        setLoading(false);
      });
  }, []);

  const onHandleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(movieApi + term)
      .then((res) => res.json())
      .then((res) => {
        if (res.results.length !== 0) {
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
        setMovie(res.items);
        setError(false);
        setLoading(false);
      });
  };

  return (
    <>
      <header className="header">
        <form action="submit" onSubmit={onHandleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={term}
            onChange={onHandleTerm}
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
    </>
  );
}

export default App;
