import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  // Uso con Promesas
  // const fetchMoviesSwapiHandler = () => {
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const transformedMovies = data.results.map((movieData) => ({
  //         key: movieData.episode_id,
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         releaseDate: movieData.release_date,
  //         openingText: movieData.opening_crawl,
  //       }));
  //       console.log(transformedMovies);
  //       setMovies(transformedMovies);
  //     });
  // };

  // Uso asnc/Away - promesa
  const fetchMoviesSwapiHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMovies([]);
    try {
      const response = await fetch("https://swapi.dev/api/films");

      if (!response.ok) {
        throw new Error("Ocurrio un error al consultar el Servicio API");
      }
      const data = await response.json();

      console.log("##=> Peliculas: ", data);

      const transformedMovies = data.results.map((movieData) => ({
        key: movieData.episode_id,
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.release_date,
        openingText: movieData.opening_crawl,
      }));
      console.log(transformedMovies);
      setMovies(transformedMovies);
    } catch (error) {
      console.log("##=> Error al consultar al servicio: ", error);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const fetchMoviesFirebaseHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setMovies([]);
    try {
      const response = await fetch(
        "https://react-http-9dad6-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Ocurrio un error al consultar el Servicio API");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          key: key,
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }

      console.log(loadedMovies);
      setMovies(loadedMovies);
    } catch (error) {
      console.log("##=> Error al consultar al servicio: ", error);
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesSwapiHandler();
  }, [fetchMoviesSwapiHandler]);

  const addMovieHandler = async (movie) => {
    console.log("##=> Agregar pelicula: ", movie);
    const response = await fetch(
      "https://react-http-9dad6-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Respuesta del envio POST: ", data);
  };

  let content = <p>No existen películas actualmente...</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Cargando datos...</p>;
  }

  return (
    <React.Fragment>
      {showAdd && (
        <section>
          <AddMovie
            onAddMovie={addMovieHandler}
            onClose={() => setShowAdd(false)}
          />
        </section>
      )}
      {!showAdd && (
        <div>
          <section>
            <button onClick={fetchMoviesSwapiHandler}>PELICULAS - SWAPI</button>{" "}
            <button onClick={fetchMoviesFirebaseHandler}>
              PELICULAS -FIREBASE
            </button>{" "}
            <button onClick={() => setShowAdd(true)}>Agregar Película</button>
          </section>
          <section>{content}</section>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;
