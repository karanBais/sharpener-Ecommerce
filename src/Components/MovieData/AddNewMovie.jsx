import React from "react";

const AddNewMovie = () => {
  const [title, setTitle] = React.useState("");
  const [openingText, setOpeningText] = React.useState("");
  const [releaseDate, setReleaseDate] = React.useState("");

  const addMovies = (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      openingText,
      releaseDate,
    };

    console.log(newMovie); 
    setTitle("");
    setOpeningText("");
    setReleaseDate("");
  };

  return (
    <div className="">
      <form
        onSubmit={addMovies}
        className="flex flex-col gap-3 items-center mb-10"
      >
        <input
          type="text"
          placeholder="Movie Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="p-2 border-1 border-blue-400 rounded-2xl px-9"
        />
        <input
          type="text"
          placeholder="Opening Text"
          onChange={(e) => setOpeningText(e.target.value)}
          value={openingText}
          className="h-50 p-2 border-1 border-blue-400 rounded-2xl px-9"
        />
        <input
          type="text"
          placeholder="Release Date"
          onChange={(e) => setReleaseDate(e.target.value)}
          value={releaseDate}
          className="p-2 border-1 border-blue-400 rounded-2xl px-9"
        />
        <button
          type="submit"
          className="border-1 border-blue-900 px-2 py-1 rounded-4xl hover:bg-blue-300"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddNewMovie;
