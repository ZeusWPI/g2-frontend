import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";

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
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(BranchService);
