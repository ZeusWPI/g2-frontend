import { Body, DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, PATCH, Path, POST } from "echofetch";
import { Project } from "@/api/models/Project";
import { ProjectCreateWrapper } from "@/api/wrappers/ProjectCreateWrapper";
import { ProjectUpdateWrapper } from "@/api/wrappers/ProjectUpdateWrapper";

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

    /**
     * Update a project.
     * @param id Project id.
     * @param body Body containing the projects data.
     */
    @PATCH("/project/{id}")
    update(@Path("id") id: number, @Body() body: ProjectUpdateWrapper): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }

    /**
     * Delete a project by id.
     * @param id Id of the project to delete.
     */
    @DELETE("/project/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(ProjectService);
