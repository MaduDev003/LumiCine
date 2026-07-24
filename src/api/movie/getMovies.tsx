import { httpClient } from "@/src/api/config/httpClient";
import { endpoints } from "@/src/api/config/endpoints";

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