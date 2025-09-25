# KFlix - Movie & TV Data Integration Guide

## 📖 Tổng Quan
Document này mô tả chi tiết cách KFlix lấy dữ liệu phim/TV show từ TMDB API và các streaming sources để bạn có thể áp dụng vào project khác.

## 🔑 API Keys & Configuration

### TMDB API Setup
```javascript
// File: backend/services/tmdb.service.js
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const fetchFromTMDB = async (url) => {
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + process.env.TMDB_API_KEY
        }
    };
    const response = await axios.get(url, { headers: options.headers });
    if(response.status !== 200) {
        throw new Error("Failed to fetch data from tmdb");
    }
    return response.data;
};
```

### Environment Variables Cần Thiết
```env
TMDB_API_KEY=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjUzN2NiMDE3NzM2ZjRkMmQ5MTQ3ZjMwYzY5NjkyNSIsIm5iZiI6MTc1NzMzODgxMi4zMiwic3ViIjoiNjhiZWRjYmMyMzgyYTAzMzBiOWMwOGFjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5lNIhNyguan7SNhkepQHwNlpwgCHWUx7XzAU_vtNrdY
```

### TMDB API Configuration
```javascript
// API Read Access Token (Bearer Token)
const TMDB_BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNjUzN2NiMDE3NzM2ZjRkMmQ5MTQ3ZjMwYzY5NjkyNSIsIm5iZiI6MTc1NzMzODgxMi4zMiwic3ViIjoiNjhiZWRjYmMyMzgyYTAzMzBiOWMwOGFjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.5lNIhNyguan7SNhkepQHwNlpwgCHWUx7XzAU_vtNrdY';

// Alternative API Key (for v3 API)
const TMDB_API_KEY = '16537cb017736f4d2d9147f30c696925';
```

## 🎬 Movie Data APIs

### 1. Lấy Danh Sách Phim Popular/Trending
```javascript
// URL: https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
export const getTrendingMovies = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        const movies = data.results;
        res.json({success:true, content:movies});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 2. Chi Tiết Phim Cụ Thể
```javascript
// URL: https://api.themoviedb.org/3/movie/{id}?language=en-US
export const getMovieDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.json({success:true, content:data});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

**Response Movie Details bao gồm:**
- `id`: Movie ID
- `title`: Tên phim
- `overview`: Mô tả phim
- `release_date`: Ngày ra mắt
- `poster_path`: Đường dẫn poster
- `backdrop_path`: Ảnh nền
- `vote_average`: Điểm đánh giá
- `vote_count`: Số lượng vote
- `runtime`: Thời lượng phim
- `genres`: Array các thể loại
- `adult`: Phim người lớn hay không

### 3. Cast & Crew (Diễn Viên & Đạo Diễn)
```javascript
// URL: https://api.themoviedb.org/3/movie/{id}/credits?language=en-US
export const getMovieCredits = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`);
        res.json({success:true, content:data});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

**Credits Response Structure:**
```javascript
{
  "cast": [
    {
      "id": 123,
      "name": "Actor Name",
      "character": "Character Name",
      "profile_path": "/path_to_actor_image.jpg",
      "known_for_department": "Acting"
    }
  ],
  "crew": [
    {
      "id": 456,
      "name": "Director Name",
      "job": "Director",
      "department": "Directing",
      "profile_path": "/path_to_director_image.jpg"
    }
  ]
}
```

### 4. Lấy Đạo Diễn từ Credits
```javascript
function getDirector(crew) {
    const director = crew.find(person => 
        (person.known_for_department === 'Directing' && 
         (person.job === "Director" || person.job === 'Writer' || person.job === 'producer')) || 
        person.job === 'Director'
    );
    return director ? director.name : "Unknown";
}
```

### 5. Trailer Videos
```javascript
// URL: https://api.themoviedb.org/3/movie/{id}/videos?language=en-US
export const getMovieTrailer = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        const trailer = data.results;
        res.json({success:true, content:trailer});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 6. Phim Tương Tự
```javascript
// URL: https://api.themoviedb.org/3/movie/{id}/similar?language=en-US&page=1
export const getSimilarMovies = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        const movies = data.results;
        res.json({success:true, content:movies});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 7. Phim Theo Category
```javascript
// Categories: "now_playing", "top_rated", "popular", "upcoming"
export const getMoviebyCategory = async (req, res) => {
    const {category} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        const movies = data.results;
        res.json({success:true, content:movies});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

## 📺 TV Show Data APIs

### 1. TV Show Details
```javascript
// URL: https://api.themoviedb.org/3/tv/{id}?language=en-US
// Tương tự movies nhưng có thêm:
// - name (thay vì title)
// - first_air_date (thay vì release_date)  
// - number_of_seasons
// - number_of_episodes
// - seasons: [] array
```

### 2. TV Episodes của Season
```javascript
// URL: https://api.themoviedb.org/3/tv/{id}/season/{season_number}?language=en-US
export const getTvEpisodes = async (req, res) => {
    const {id, season} = req.body;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`);
        res.json({success:true, content:data});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 3. TV Categories
```javascript
// Categories: "airing_today", "on_the_air", "popular", "top_rated"
const TV_CATEGORIES = ["airing_today", "on_the_air", "popular", "top_rated"];
```

## 🔍 Search Functionality

### 1. Multi-Search (Movies, TV, Person)
```javascript
// URL: https://api.themoviedb.org/3/search/multi?query={query}&language=en-US&page=1
export const searchContent = async (req, res) => {
    const {query} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/multi?query=${query}&language=en-US&page=1`);
        res.json({success:true, content:data.results});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 2. Search Specific Movie
```javascript
// URL: https://api.themoviedb.org/3/search/movie?query={title}&primary_release_year={year}&language=en-US&page=1
// Cho AI chatbot tìm phim cụ thể
const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${title}&primary_release_year=${year}&language=en-US&page=1`);
```

### 3. Person Details (Cast/Crew Info)
```javascript
// URL: https://api.themoviedb.org/3/person/{person_id}?language=en-US
export const getPersonDetails = async (req, res) => {
    const {id} = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/person/${id}?language=en-US`);
        res.json({success:true, content:data});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

## 🎭 Anime/Special Content

### 1. Anime Movies (Keyword-based)
```javascript
// URL: https://api.themoviedb.org/3/discover/movie?with_keywords=210024&sort_by=popularity.desc
export const getAnimePopular = async (req, res) => {
    try {
        const data1 = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/movie?with_keywords=210024&sort_by=popularity.desc`);
        const data2 = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/movie?with_keywords=210024&sort_by=popularity.desc&page=2`);
        const data3 = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/movie?with_keywords=210024&sort_by=popularity.desc&page=3`);
        const data = [...data1.results, ...data2.results, ...data3.results];
        res.json({success:true, content:data});
    } catch(error) {
        res.status(500).json({success:false, message:error.message});
    }
}
```

### 2. Japanese Animation (Genre-based)
```javascript
// URL: https://api.themoviedb.org/3/discover/movie?with_genres=16&with_origin_country=JP&sort_by=popularity.desc
export const getAnimeOnAir = async (req, res) => {
    try {
        const data1 = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/movie?&with_genres=16&with_origin_country=JP&sort_by=popularity.desc`);
        const data2 = await fetchFromTMDB(`https://api.themoviedb.org/3/discover/movie?&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&page=2`);
        const data = [...data1.results, ...data2.results];
        res.json({ success: true, content: data });
    } catch(error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
```

## 🖼️ Image URLs

### Constants cho Image Paths
```javascript
export const SMALL_IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const ORIGINAL_IMG_BASE_URL = "https://image.tmdb.org/t/p/original";

// Usage:
const posterUrl = `${ORIGINAL_IMG_BASE_URL}${movie.poster_path}`;
const backdropUrl = `${ORIGINAL_IMG_BASE_URL}${movie.backdrop_path}`;
```

## 🎥 Streaming Sources Integration

### 1. Movie Streaming URLs
```javascript
const movieSources = [
    { name: "Source1 (Filmu)", description: "adfree", url: `https://embed.filmu.fun/media/tmdb-movie-${movieId}` },
    { name: "Source2 (rivestream)", description: "brave browser recommended", url: `https://rivestream.net/embed?type=movie&id=${movieId}` },
    { name: "Source3 (Videasy)", description: "brave browser recommended", url: `https://player.videasy.net/movie/${movieId}` },
    { name: "Source4 (vidlink)", description: "brave browser only", url: `https://vidlink.pro/movie/${movieId}` },
    { name: "Source5 (111movies)", description: "brave browser recommended", url: `https://111movies.com/movie/${movieId}` },
    { name: "Source6 (nontongo)", description: "brave browser only", url: `https://www.NontonGo.win/embed/movie/${movieId}` },
    { name: "Source7 (pstream)", description: "adfree", url: `https://iframe.pstream.org/media/tmdb-movie-${movieId}` }
];
```

### 2. TV Show Streaming URLs
```javascript
const tvSources = [
    { name: "Source1 (Filmu)", description: "adfree", url: `https://embed.filmu.fun/embed/tmdb-tv-${tvId}/${season}/${episode}` },
    { name: "Source2 (rivestream)", description: "brave browser recommended", url: `https://rivestream.net/embed?type=tv&id=${tvId}&season=${season}&episode=${episode}` },
    { name: "Source3 (Videasy)", description: "brave browser recommended", url: `https://player.videasy.net/tv/${tvId}/${season}/${episode}` },
    { name: "Source4 (vidlink)", description: "brave browser only", url: `https://vidlink.pro/tv/${tvId}/${season}/${episode}` },
    { name: "Source5 (111movies)", description: "brave browser recommended", url: `https://111movies.com/tv/${tvId}/${season}/${episode}` },
    { name: "Source6 (nontong)", description: "brave browser only", url: `https://www.NontonGo.win/embed/tv/?id=${tvId}&s=${season}&e=${episode}` },
    { name: "Source7 (pstream)", description: "adfree", url: `https://iframe.pstream.org/embed/tmdb-tv-${tvId}/${season}/${episode}` }
];
```

## 🤖 AI Integration for Movie Recommendations

### 1. System Prompt cho AI
```javascript
const systemInstruction = `
You are a chatbot named 'Flix' on a movie and TV streaming platform. 
Your task is to assist the user in finding movies or TV shows only if the user ask about movies or tv shows.
If prompt includes movies (e.g., "movie", "cinema", "film"), respond with a light, engaging conversation followed by a JSON string like {"movies": ["movie1 (year of release)", "movie2 (year of release)", .... , "movie(n) (year of release)"]} Give as many names as possible or based on the user prompt. 
If prompt includes TV shows (e.g., "tv", "show", "anime", "series", "documentaries" or "documentary", "serial", "cartoon"), respond with a light conversation followed by a JSON string like {"tv": ["tv1 (year of release)", "tv2 (year of release)",...., "tv(n) (year of release)"]} Give as many names as possible or based on user prompt. 
If prompt includes multiple genres, put all of them in single json string {"movies": ["movie1 (year of release)", "movie2 (year of release)",...., "movie(n) (year of release)"]} or {"tv": ["tv1 (year of release)", "tv2 (year of release)",...., "tv(n) (year of release)"]}
*Follow the strict format in the output where there shouldn't be any text before or after it ex: "<Name> <year of release>. No additional data if found just don't include it"
For normal greetings or conversations, respond with a friendly message and ask the user what they would like to watch.
If no specific content is found or explicit prompt is found, chat in engaging manner why you can't find it. 
If the user asks any question outside of movies or TV context, try to give a response according to the user's context.
`;
```

### 2. Parse AI Response & Search TMDB
```javascript
// Parse AI response để lấy movie/TV names
let jsonMatch = result.match(/([\s\S]*?)({[\s\S]*})/);
if(jsonMatch) {
    const jsonString = jsonMatch[2].trim();
    const introText = ((jsonMatch[1]).trim() || "");
    const result1 = JSON.parse(jsonString);
    
    // Search từng phim/TV show
    for(let i = 0; i < result1.length; i++) {
        let [title, year] = result1[i].match(/^(.*)\s\((\d{4})\)$/).slice(1);
        title = title.trim();
        year = year.toString();
        
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/${contentType}?query=${title}&primary_release_year=${year}&language=en-US&page=1`);
        const content = data.results;
        if(content.length > 0) {
            results.push(content[0]);
        }
    }
}
```

## 📊 Complete API Routes Structure

### Backend Routes (Express.js)
```javascript
// Movies
router.get('/trending', getTrendingMovies)
router.get('/trailers/:id', getMovieTrailer)
router.get('/details/:id', getMovieDetails)
router.get('/similar/:id', getSimilarMovies)
router.get('/category/:category', getMoviebyCategory)
router.get('/credits/:id', getMovieCredits)

// TV Shows  
router.get('/tv/details/:id', getTvDetails)
router.post('/tv/episodes', getTvEpisodes)
router.get('/tv/similar/:id', getSimilarTv)

// Search
router.get('/search/multi/:query', searchMulti)
router.get('/search/movie/:query', searchMovie)
router.get('/search/tv/:query', searchTv)
router.get('/search/person/:query', searchPerson)

// Person
router.get('/person/:id', getPersonDetails)

// Anime
router.get('/anime/popular', getAnimePopular)
router.get('/anime/top-rated', getAnimeTopRated)
router.get('/anime/on-air', getAnimeOnAir)
```

## 💾 Data Models (MongoDB Schema)

### User Schema
```javascript
const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    searchHistory: { type: Array, default: [] },
    watchHistory: { type: Array, default: [] },
    watchList: { type: Array, default: [] },
    chatHistory: { type: Array, default: [] },
    Preferences: {
        adult: { type: Boolean, default: false }
    }
});
```

### Watch History Entry Structure
```javascript
// Movie watch history
{
    type: 'movie',
    id: movieId,
    image: poster_path,
    title: movie.title,
    createdAt: new Date()
}

// TV episode watch history  
{
    type: 'tv',
    id: tvId,
    season: seasonNumber,
    episode: episodeNumber,
    image: poster_path,
    title: episode.name,
    showName: tv.name,
    totalEpisodes: season.episode_count,
    createdAt: new Date()
}
```

## 🎯 Key Implementation Tips

1. **Rate Limiting**: TMDB có rate limit, implement caching cho frequently accessed data

2. **Error Handling**: Always check if `results` array không empty trước khi access

3. **Image Fallbacks**: Check cả `poster_path` và `backdrop_path`, fallback nếu null

4. **Multi-language Support**: Thêm `language=en-US` hoặc user preference

5. **Pagination**: TMDB trả maximum 20 items per page, implement pagination cho large datasets

6. **Streaming Sources**: Các embed sources có thể thay đổi, cần backup sources

## 🔐 Security Notes

- Không expose TMDB API key ở frontend
- Validate user inputs trước khi query TMDB
- Implement authentication cho protected routes
- Rate limiting cho search APIs

## 📱 Frontend Integration Example

### React Component Usage
```javascript
// Fetch movie details
const [movie, setMovie] = useState(null);

useEffect(() => {
    const fetchMovie = async () => {
        const response = await axios.get(`/api/v1/movies/details/${movieId}`);
        setMovie(response.data.content);
    };
    fetchMovie();
}, [movieId]);

// Display
<div>
    <h1>{movie?.title}</h1>
    <p>{movie?.overview}</p>
    <img src={`${ORIGINAL_IMG_BASE_URL}${movie?.poster_path}`} />
    <p>Rating: {movie?.vote_average}/10</p>
    <p>Release: {movie?.release_date}</p>
</div>
```

---

## 📝 Summary

Document này cung cấp tất cả kiến thức cần thiết để integrate TMDB API và streaming sources như KFlix:

1. **TMDB API endpoints** cho movies, TV shows, search, credits
2. **Streaming sources integration** với multiple backup options  
3. **AI chatbot integration** cho smart recommendations
4. **Database schemas** cho user data và history
5. **Complete code examples** ready để implement

Copy/paste và modify theo needs của bạn! 🚀

**Lưu ý**: Nhớ đăng ký TMDB API key miễn phí tại https://www.themoviedb.org/settings/api
