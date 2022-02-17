import React, { useRef } from "react";

import classes from "./AddMovie.module.css";

function AddMovie(props) {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();

    // Podria realizar validaciones aqui...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);
  }

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" ref={titleRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor="opening-text">Texto de apertura</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor="date">Fecha de lanzamiento</label>
        <input type="text" id="date" ref={releaseDateRef} />
      </div>
      <button onClick={props.onClose}>Cancelar</button>
      <button>Agregar</button>
    </form>
  );
}

export default AddMovie;
