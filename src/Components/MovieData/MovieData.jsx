import React, { useEffect } from "react";

const MovieData = () => {
  const [movies, setMovies] = React.useState([]);
  const [isloading, setIsloading] = React.useState(false);

  useEffect(() => {
  }, []);

  const fetchMovie = () => {
    setIsloading(true);
    FetchApi();
    setIsloading(false);
  }
  const FetchApi = async () => {
    try {
      const response = await fetch("https://swapi.info/api/films");
      const data = await response.json();

      const getMovies = data.map((movieData) => {
        return {
          title: movieData.title,
          id: movieData.episode_id,
          Mdirector: movieData.director,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(getMovies);
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="mx-auto my-10gap-20 place-items-center">
    <h1 className="text-3xl text-center py-4">MOVIES</h1>
    <button onClick={fetchMovie} className="border-2 border-amber-500 py-1 px-2 hover:bg-amber-200 ">Fetch Movies</button>
        {isloading ? <p>Loading...</p> : 
        <div className="mx-auto my-10gap-20 place-items-center">
        
        <div className="mx-auto my-10 grid grid-cols-2 gap-20">
          {movies.map((movie) => (
            <div className=" " key={movie.id}>
              <div className=" border-2 border-black p-4 rounded-lg">
                <p className="text-center text-gray-500">{movie.releaseDate}</p>
                <h2 className="text-2xl font-bold text-center">
                  {movie.title}
                </h2>
                <p className="text-center">{movie.Mdirector}</p>
              </div>
            </div>
          ))}
        </div>
      </div>}
      
    </div>
  );
};

export default MovieData;
