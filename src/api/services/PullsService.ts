import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, Path, POST } from "echofetch";

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

    /**
     * Feature a given pull request.
     * @param id Id of the pull request to feature.
     */
    @POST("/pulls/{id}/feature")
    feature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unfeature a given pull request.
     * @param id Id of the pull request to unfeature.
     */
    @DELETE("/pulls/{id}/feature")
    unfeature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(PullsService);
