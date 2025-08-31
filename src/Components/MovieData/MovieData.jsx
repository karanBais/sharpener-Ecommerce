import React, { use, useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";

const MovieData = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryInterval, setRetryInterval] = useState(null);
  const [cancelRetry, setCancelRetry] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [])

  const fetchMovie = async () => {
    setIsLoading(true);
    setError(false);
    try {
      const response = await fetch("https://swapi.info/api/films");

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      const getMovies = data.map((movieData) => ({
        title: movieData.title,
        id: movieData.episode_id,
        Mdirector: movieData.director,
        releaseDate: movieData.release_date,
      }));

      setMovies(getMovies);
      setIsLoading(false);
      setError(false);

      // agar data aa gaya to retry stop
      if (retryInterval) {
        clearInterval(retryInterval);
        setRetryInterval(null);
      }

    } catch (err) {
      console.log("Error:", err);
      setIsLoading(false);
      setError(true);

      // agar cancel nahi hua hai to retry start kare
      if (!cancelRetry && !retryInterval) {
        const interval = setInterval(() => {
          console.log("Retrying API...");
          fetchMovie();
        }, 5000);
        setRetryInterval(interval);
      }
    }
  };

  // jab cancel button click ho to retry stop
  const handleCancelRetry = () => {
    setCancelRetry(true);
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
    }
  };

  useEffect(() => {
    return () => {
      // component unmount hone pe interval clear
      if (retryInterval) clearInterval(retryInterval);
    };
  }, [retryInterval]);

  return (
    <div className="mx-auto my-10 gap-20 place-items-center">
      <h1 className="text-3xl text-center py-4">MOVIES</h1>
    

      {isLoading && <p className="text-center my-10">Loading...</p>}

      {/* Agar error hai to ErrorPage show karo */}
      {error && (
        <ErrorPage cancel={handleCancelRetry}>
          <button
            onClick={handleCancelRetry}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel Retry
          </button>
        </ErrorPage>
      )}

      {!isLoading && !error && movies.length === 0 && (
        <p className="text-center my-10">No Movies Found</p>
      )}

      {!isLoading && !error && movies.length > 0 && (
        <div className="mx-auto my-10 grid grid-cols-2 gap-20">
          {movies.map((movie) => (
            <div key={movie.id} className="border-2 border-black p-4 rounded-lg">
              <p className="text-center text-gray-500">{movie.releaseDate}</p>
              <h2 className="text-2xl font-bold text-center">{movie.title}</h2>
              <p className="text-center">{movie.Mdirector}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieData;
