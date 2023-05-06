import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import MovieScreen from "./components/MovieScreen";
import Watchlist from "./components/Watchlist";

function App() {
  const [list, setList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);

  const addMovie = (movie) => setList([...list, movie]);

  const removeMovie = (movie) => {
    const newState = list.filter((mov) => {
      return mov !== movie;
    });
    setList(newState);
  };

  //================================================================//

  // const getData = () => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
  //     )
  //     .then((res) => {
  //       console.log(res.data.results);
  //       setMovieList(res.data.results);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, [page,]);

  // Warning: Line 35:6: React Hook useEffect has a missing dependency: "getData". Either include it or remove the dependency array.

  //================================================================//

  //By using useCallback, you are ensuring that the getData function only changes when its dependencies change, which in this case is only the page variable. This prevents the useEffect hook from having an unnecessary dependency on getData, and it also improves performance by reducing the number of re-renders.

  const getData = useCallback(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <Header />
      <main>
        <MovieScreen
          addMovie={addMovie}
          movieList={movieList}
          page={page}
          setPage={setPage}
          list={list}
          removeMovie={removeMovie}
        />
        <Watchlist list={list} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
