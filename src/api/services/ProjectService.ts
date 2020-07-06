import { Body, DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, PATCH, Path, POST } from "echofetch";
import { Project } from "@/api/models/Project";
import { ProjectCreateWrapper } from "@/api/wrappers/ProjectCreateWrapper";
import { ProjectUpdateWrapper } from "@/api/wrappers/ProjectUpdateWrapper";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Repository } from "@/api/models/Repository";

/**
 * Service for managing projects.
 */
class ProjectService extends EchoService {
    /**
     * Get a list with projects
     */
    @GET("/projects")
    getAll(): EchoPromise<Project[]> {
        return {} as EchoPromise<Project[]>;
    }

    /**
     * Get a single projects by id.
     * @prop id Project id.
     */
    @GET("/projects/{id}")
    get(@Path("id") id: number): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }

    /**
     * Create a new projects.
     * @param body Body containing the projects data.
     */
    @POST("/projects")
    create(@Body() body: ProjectCreateWrapper): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }

    /**
     * Update a project.
     * @param id Project id.
     * @param body Body containing the projects data.
     */
    @PATCH("/projects/{id}")
    update(@Path("id") id: number, @Body() body: ProjectUpdateWrapper): EchoPromise<Project> {
        return {} as EchoPromise<Project>;
    }

    /**
     * Delete a project by id.
     * @param id Id of the project to delete.
     */
    @DELETE("/projects/{id}")
    delete(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Get a list with issues for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/issues")
    issues(@Path("id") id: number): EchoPromise<Issue[]> {
        return {} as EchoPromise<Issue[]>;
    }

    /**
     * Get a list with repositories for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/repositories")
    repositories(@Path("id") id: number): EchoPromise<Repository[]> {
        return {} as EchoPromise<Repository[]>;
    }

    /**
     * Get a list with pulls for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/pulls")
    pulls(@Path("id") id: number): EchoPromise<Pull[]> {
        return {} as EchoPromise<Issue[]>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(ProjectService);
