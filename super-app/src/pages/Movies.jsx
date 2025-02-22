import React, { useEffect, useState } from "react";
import userImg_dp from "/card_img/userImg_dp.png";

const API_KEY = "e89c8a6891a8b5e043482a1ea3fab486";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const genreMap = {
  Action: 28,
  Drama: 18,
  Romance: 10749,
  Thriller: 53,
  Western: 37,
  Horror: 27,
  Fantasy: 14,
  Music: 10402,
  Fiction: 878,
};

const getMoviesByGenre = async (genreId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    const data = await response.json();

    if (!data.results || data.results.length === 0) throw new Error("No movies found");

    return data.results.slice(0, 6).map((movie) => ({
      name: movie.title,
      image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : null,
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

const Movies = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      const selectedGenres = JSON.parse(localStorage.getItem("selectedMovies")) || [];
      const genreMovies = {};

      await Promise.all(
        selectedGenres.map(async (genre) => {
          const genreId = genreMap[genre.title];
          if (genreId) {
            genreMovies[genre.title] = await getMoviesByGenre(genreId);
          }
        })
      );

      setMoviesByGenre(genreMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className="mainCont" style={{ height: "100vh", color: "white" }}>
      <div className="row1" style={{ height: "16%", display: "flex", justifyContent: 'space-between', padding: '2rem' }}>
        <h1 style={{ fontFamily: "Single Day", fontSize: "2.3rem", color: "#72DB73" }}>
          Super App
        </h1>
        <img style={{ width: "3.1rem", height: "3.1rem", borderRadius: "50%", border: "2px solid white" }} src={userImg_dp} alt="User" />
      </div>

      <div className="row2" style={{ height: "80%", padding: '0 4.5rem' }}>
        <h2>Entertainment according to your choice</h2>
        <br />

        {Object.keys(moviesByGenre).map((genre) => (
          <div key={genre} style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "rgba(135, 135, 135, 1)", marginBottom: "1.5rem", fontSize: '1.5rem' }}>{genre}</h3>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {moviesByGenre[genre]?.map((movie, index) => (
                <div key={index} className="card" style={{ width: "12rem", textAlign: "center", transition: "transform 0.3s ease" }}>
                  {movie.image ? (
                    <img src={movie.image} alt={movie.name} style={{ width: "100%", borderRadius: "10px", cursor: 'pointer' }} />
                  ) : (
                    <div style={{ backgroundColor: "#333", padding: "1rem", borderRadius: "10px" }}>No Image</div>
                  )}
                  <h2 style={{ fontSize: "1rem", marginTop: "5px" }}>{movie.name}</h2>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .card:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Movies;
