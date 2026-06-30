import { httpClient } from "../config/httpClient";
import { endpoints } from "../config/endpoints";

export async function getMovies(page: number) {
    try{
        const { data } = await httpClient.get(
            `${endpoints.movie.getMovies}?page=${page}&language=pt-BR`
        );
        
        return data.results;
    }catch(error){
        throw error;
    }
}