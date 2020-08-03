import { EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST } from "echofetch";
import { Repository } from "@/api/models/Repository";

/**
 * Service for managing repositories.
 */
class RepositoryService extends EchoService {
    /**
     * Get a list with repositories
     */
    @GET("/repositories")
    getAll(): EchoPromise<Repository[]> {
        return {} as EchoPromise<Repository[]>;
    }

    /**
     * Get a single repository by id.
     * @prop id Repository id.
     */
    @GET("/repositories/{id}")
    get(@Path("id") id: number): EchoPromise<Repository> {
        return {} as EchoPromise<Repository>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(RepositoryService);
