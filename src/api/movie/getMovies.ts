import { httpClient } from "../config/httpClient";
import { endpoints } from "../config/endpoints";

export async function getMovies() {
    try{
        const { data } = await httpClient.get(
            endpoints.movie.getMovies
        );
        
        return data.results;
    }catch(error){
        throw error;
    }
}