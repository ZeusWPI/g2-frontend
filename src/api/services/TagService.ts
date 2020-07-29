import { Body, DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, Path, POST, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";
import { TagCreateWrapper } from "@/api/wrappers/TagCreateWrapper";

/**
 * Service for managing tags.
 */
class TagService extends EchoService {
    /**
     * Get a list with tags.
     */
    @GET("/tags")
    getAll(): EchoPromise<Tag[]> {
        return {} as EchoPromise<Tag[]>;
    }

    /**
     * Delete a given tag by id.
     * @param id Id of the tag.
     */
    @DELETE("/tags/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Create a new tag
     */
    @POST("/tags")
    create(@Body() body: TagCreateWrapper): EchoPromise<Tag> {
        return {} as EchoPromise<Tag>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(TagService);
