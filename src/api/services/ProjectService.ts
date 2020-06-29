import {
    Body,
    EchoPromise,
    EchoService,
    EchoServiceBuilder,
    GET,
    Path,
    POST
} from "echofetch";
import { Project } from "@/api/models/Project";
import { ProjectCreateWrapper } from "@/api/wrappers/ProjectCreateWrapper";

/**
 * Service for managing projects.
 */
class ProjectService extends EchoService {
    /**
     * Get a list with projects
     */
    @GET("/project")
    getAll(): EchoPromise<Project[]> {
        return {} as EchoPromise<Project[]>;
    }

    /**
     * Get a single projects by id.
     * @prop id Project id.
     */
    @GET("/project/{id}")
    get(@Path("id") id: number): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }

    /**
     * Create a new projects.
     * @param body Body containing the projects data.
     */
    @POST("/project")
    create(@Body() body: ProjectCreateWrapper): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }
}

export default new EchoServiceBuilder()
    .setBaseUrl(process.env.VUE_APP_BACKEND_URL)
    .build(ProjectService);
