import { EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, PUT } from "echofetch";
import { Project } from "@/api/models/Project";
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

    /**
     * Link a repository to a projects.
     * @param id Repository id.
     * @param projectId Project id.
     */
    @POST("/repositories/{id}/link/{pid}")
    linkProject(@Path("id") id: number, @Path("pid") projectId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unlink a repository from a projects.
     * @param id Repository id.
     * @param projectId Project id.
     */
    @POST("/repositories/{id}/unlink/{pid}")
    unlinkProject(@Path("id") id: number, @Path("pid") projectId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(RepositoryService);
