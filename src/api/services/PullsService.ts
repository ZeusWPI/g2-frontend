import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";

/**
 * Service for managing pull requests.
 */
class PullsService extends EchoService {
    /**
     * Link a tag to a given pull request.
     * @param id Id of the pull request.
     * @param tagId Id of the tag to link.
     */
    @POST("/pulls/{id}/tags/{tagId}")
    linkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unlink a tag to a given pull request.
     * @param id Id of the pull request.
     * @param tagId Id of the tag to unlink.
     */
    @DELETE("/pulls/{id}/tags/{tagId}")
    unlinkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(PullsService);
