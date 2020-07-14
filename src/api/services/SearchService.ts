import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";
import { SearchWrapper } from "@/api/wrappers/SearchWrapper";

/**
 * Service for searching.
 */
class SearchService extends EchoService {
    /**
     * Search for a given set of items.
     * @param q Search query.
     * @param limit Search result limit.
     */
    @GET("/search")
    search(@Query("q") q: string, @Query("limit") limit?: number): EchoPromise<SearchWrapper> {
        return {} as EchoPromise<SearchWrapper>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(SearchService);
