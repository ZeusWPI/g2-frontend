import { ProjectStatistics } from "@/api/models/ProjectStatistics";
import { Tag } from "@/api/models/Tag";

export class Project {
    id: number;
    name: string;
    description: string;
    image: string;
    statistics: ProjectStatistics;
    tags: Tag[];
}
