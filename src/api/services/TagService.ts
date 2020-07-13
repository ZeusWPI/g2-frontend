import { EchoPromise, EchoService, EchoServiceBuilder, GET, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";

/**
 * Service for managing tags.
 */
class TagService extends EchoService {
    /**
     * Get a list with tags.
     * @param global Should only the global tags (tags not linked to a project) be displayed.
     * @param projectId Id of the project to display all available tags for. Subprojects should also return tags from its parents recursivly.
     */
    @GET("/tags")
    getAll(@Query("global") global?: boolean, @Query("projectId") projectId?: number): EchoPromise<Tag[]> {
        return {} as EchoPromise<Tag[]>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(TagService);
