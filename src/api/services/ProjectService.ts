import { Body, DELETE, EchoPromise, EchoService, EchoServiceBuilder, GET, PATCH, Path, POST, Query } from "echofetch";
import { Project } from "@/api/models/Project";
import { ProjectCreateWrapper } from "@/api/wrappers/ProjectCreateWrapper";
import { ProjectUpdateWrapper } from "@/api/wrappers/ProjectUpdateWrapper";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Repository } from "@/api/models/Repository";
import { Author } from "@/api/models/Author";
import { Feature } from "@/api/models/Feature";
import { Tag } from "@/api/models/Tag";
import { Branch } from "@/api/models/Branch";

/**
 * Service for managing projects.
 */
class ProjectService extends EchoService {
    /**
     * Get a list with projects
     */
    @GET("/projects")
    getAll(
        @Query("sort") sort?: "popular" | "recent" | "alphabetical",
        @Query("limit") limit?: number
    ): EchoPromise<Project[]> {
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
     * Create a new project.
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
        return {} as EchoPromise<Pull[]>;
    }

    /**
     * Get a list with branches for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/branches")
    branches(@Path("id") id: number): EchoPromise<Branch[]> {
        return {} as EchoPromise<Branch[]>;
    }

    /**
     * Get a list with maintainers for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/maintainers")
    maintainers(@Path("id") id: number): EchoPromise<Author[]> {
        return {} as EchoPromise<Author[]>;
    }

    /**
     * Get a list with contributors for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/contributors")
    contributors(@Path("id") id: number): EchoPromise<Author[]> {
        return {} as EchoPromise<Author[]>;
    }

    /**
     * Get a list with featured items for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/features")
    features(@Path("id") id: number): EchoPromise<Feature[]> {
        return {} as EchoPromise<Feature[]>;
    }

    /**
     * Get a list with tags for a given project.
     * @param id Id of the project.
     */
    @GET("/projects/{id}/tags")
    tags(@Path("id") id: number): EchoPromise<Tag[]> {
        return {} as EchoPromise<Tag[]>;
    }

    /**
     * Get a list with subprojects for a given project.
     */
    @GET("/projects/{id}/subprojects")
    subprojects(@Path("id") id: number): EchoPromise<Project[]> {
        return {} as EchoPromise<Project[]>;
    }

    /**
     * Link an entity to a given project.
     * @param id Id of the project.
     * @param entityId Id of the entity to link.
     */
    @POST("/projects/{id}/link/{entityId}")
    linkEntity(@Path("id") id: number, @Path("entityId") entityId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unlink a entity from a given project.
     * @param id Id of the project.
     * @param entityId Id of the entity to unlink.
     */
    @DELETE("/projects/{id}/link/{entityId}")
    unlinkEntity(@Path("id") id: number, @Path("entityId") entityId: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Feature a given project.
     * @param id Id of the project to feature.
     */
    @POST("/projects/{id}/feature")
    feature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }

    /**
     * Unfeature a given project.
     * @param id Id of the project to unfeature.
     */
    @DELETE("/projects/{id}/feature")
    unfeature(@Path("id") id: number): EchoPromise<void> {
        return {} as EchoPromise<void>;
    }
}

export default new EchoServiceBuilder().setBaseUrl(process.env.VUE_APP_BACKEND_URL).build(ProjectService);
