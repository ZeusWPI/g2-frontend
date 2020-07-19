import { Author } from "@/api/models/Author";
import { Project } from "@/api/models/Project";
import { Issue } from "@/api/models/Issue";
import { Pull } from "@/api/models/Pull";
import { Branch } from "@/api/models/Branch";

export class Feature {
    id: number;
    author: Author;
    type: "project" | "issue" | "pull" | "branch";
    data: {
        project?: Project;
        issue?: Issue;
        pull?: Pull;
        branch?: Branch;
    };
}
