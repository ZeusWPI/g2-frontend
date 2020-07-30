import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, Path, POST } from "echofetch";

/**
 * Service for managing branches.
 */
class BranchService extends EchoService {
    /**
     * Link a tag to a given branch.
     * @param id Id of the branch.
     * @param tagId Id of the tag to link.
     */
    @POST("/branches/{id}/tags/{tagId}")
    linkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unlink a tag to a given branch.
     * @param id Id of the branch.
     * @param tagId Id of the tag to unlink.
     */
    @DELETE("/branches/{id}/tags/{tagId}")
    unlinkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Feature a given branch.
     * @param id Id of the branch to feature.
     */
    @POST("/branches/{id}/feature")
    feature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unfeature a given branch.
     * @param id Id of the branch to unfeature.
     */
    @DELETE("/branches/{id}/feature")
    unfeature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(BranchService);
