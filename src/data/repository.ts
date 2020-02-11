import Repository from "./models/Repository";
import Config from "../config";
import { fetch } from "@/util/fetch";

/**
 * Get a repository by its specific identifier.
 * @param id Identifier of the repository.
 */
export function getRepository(id: number) {
    return fetch<Repository>(
        `${Config.BACKEND.URL}${Config.BACKEND.ENDPOINTS.REPOSITORY}/${id}`,
        () => new Repository()
    );
}
