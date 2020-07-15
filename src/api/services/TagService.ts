import { EchoPromise, EchoService, EchoServiceBuilder, GET, Query } from "echofetch";
import { Tag } from "@/api/models/Tag";

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
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(TagService);
