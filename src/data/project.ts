import Project from "./models/Project";
import Config from "../config";
import { fetch } from "../util/fetch";
import Query from "./structs/Query";
import Repository from "./models/Repository";
import { getRepository } from "./repository";

/**
 * Get a project by its specific identifier.
 * @param id Identifier of the project.
 */
export function getProject(id: number): Query<Project> {
    // Fetch the project from the server.
    return fetch<Project>(
        `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.PROJECT}/${id}`,
        () => new Project()
    );
}

/**
 * Get a list with all the projects.
 */
export function getProjects(): Query<Array<Project>> {
    console.log(`${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.PROJECT}`);
    return fetch<Project>(
        `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.PROJECT}`,
        () => new Project()
    );
}

/**
 * Get the list with repositories for a specific project.
 * @param project Query containing the project as result.
 */
export function getProjectRepositories(
    project: Query<Project>
): Array<Query<Repository>> {
    if (!project || !project.data) {
        return [];
    }

    if (project.data.repo_ids === undefined) {
        return [];
    }

    return project.data.repo_ids.map(repo_id => getRepository(repo_id));
}
