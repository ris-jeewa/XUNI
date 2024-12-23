import axios from "axios";
import { TMDB_API_KEY } from '../constants';

const apiBaseUrl = 'https://api.themoviedb.org/3';

const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${TMDB_API_KEY}`;
const popularMovies = `${apiBaseUrl}/movie/popular?api_key=${TMDB_API_KEY}`;
const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${TMDB_API_KEY}`;
const topratedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${TMDB_API_KEY}`;



const apiCall = async (endpoint,params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params:params? params: {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(e){
        console.log('error',e);
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMovies);
}

export const fetchPopularMovies = () => {
    return apiCall(popularMovies);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMovies);
}

export const fetchTopRatedMovies = () => {
    return apiCall(upcomingMovies);
}