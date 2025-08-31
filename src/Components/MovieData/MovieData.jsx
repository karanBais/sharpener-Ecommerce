import React, { useEffect, useState } from "react";
import ErrorPage from "./ErrorPage";
import AddNewMovie from "./AddNewMovie";

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
      const response = await fetch("https://sharpener-movie-1235c-default-rtdb.firebaseio.com/movies.json");
      const data = await response.json();
      const getMovies = [];

      for (const key in data)(
        getMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        })
      )

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

  const deleteHandler = async(id) =>{
try{
    const response = await fetch(`https://sharpener-movie-1235c-default-rtdb.firebaseio.com/movies/${id}.json`,{
      method: 'DELETE',

    })
     setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    const data = await response.json();
    console.log("Delete Response:", data)
}
catch(error){
  console.log(error);
} 

  }
  // jab cancel button click ho to retry stop
  const handleCancelRetry = () => {
    setCancelRetry(true);
    if (retryInterval) {
      clearInterval(retryInterval);
      setRetryInterval(null);
    }
  };

  const addMovies = async(movie) =>{
    try{
      const response = await fetch('https://sharpener-movie-1235c-default-rtdb.firebaseio.com/movies.json',{
      method:'POST',
      body:JSON.stringify(movie),
      headers: {
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    onsole.log("Firebase Response:", data);;
    }catch(error){
      console.log(error);
    }
  }

  

  useEffect(() => {
    return () => {
      // component unmount hone pe interval clear
      if (retryInterval) clearInterval(retryInterval);
    };
  }, [retryInterval]);

  

  return (
    <div className="mx-auto my-10 gap-20 place-items-center">
    <AddNewMovie onAddMovie={addMovies} /> 
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
              <p className="text-center">{movie.openingText}</p>
              <button onClick={() => deleteHandler(movie.id)} className="border-1 border-red-500 py-1 px-2 rounded-2xl hover:bg-red-400">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieData;
