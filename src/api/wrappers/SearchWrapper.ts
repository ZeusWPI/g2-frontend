import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Project } from "@/api/models/Project";
import { Branch } from "@/api/models/Branch";

export class SearchWrapper {
    issues: Issue[];
    pulls: Pull[];
    projects: Project[];
    branches: Branch[];
}
