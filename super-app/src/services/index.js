export async function getNews() {
    const res = await fetch(
        'https://newsapi.org/v2/everything?q=tesla&from=2025-02-16&sortBy=publishedAt&apiKey=6f92e8f22e154c4f9b672d7cf6b77989'
    );
    const data = await res.json();
    return data;  // ✅ Now it returns the API response
}
export async function getWeather() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = `https://api.weatherapi.com/v1/current.json?key=0986a24c86fe490aa66111209252002&q=${lat},${lon}&aqi=yes`;

                try {
                    const res = await fetch(url);
                    const data = await res.json();
                    resolve(data);
                } catch (error) {
                    reject("Error fetching weather data: " + error);
                }
            }, (error) => {
                reject("Geolocation error: " + error.message);
            });
        } else {
            reject("Geolocation is not supported by this browser.");
        }
    });
    
}

const API_KEY = "e89c8a6891a8b5e043482a1ea3fab486";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Function to get movies by genre
async function getMoviesByGenre(genreId) {
    try {
        const response = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
        );
        const data = await response.json();

        if (!data.results) throw new Error("No movies found");

        return data.results.map(movie => ({
            name: movie.title,
            image: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "No Image"
        }));
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}



