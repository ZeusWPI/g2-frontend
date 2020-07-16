import { DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";

/**
 * Service for managing issues.
 */
class IssueService extends EchoService {
    /**
     * Link a tag to a given issue.
     * @param id Id of the issue.
     * @param tagId Id of the tag to link.
     */
    @POST("/issues/{id}/tags/{tagId}")
    linkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unlink a tag to a given issue.
     * @param id Id of the issue.
     * @param tagId Id of the tag to unlink.
     */
    @DELETE("/issues/{id}/tags/{tagId}")
    unlinkTag(@Path("id") id: number, @Path("tagId") tagId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Feature a given issue.
     * @param id Id of the issue to feature.
     */
    @POST("/issues/{id}/feature")
    feature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unfeature a given issue.
     * @param id Id of the issue to unfeature.
     */
    @DELETE("/issues/{id}/feature")
    unfeature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(IssueService);
