import { ProjectStatistics } from "@/api/models/ProjectStatistics";

export class Project {
    id: number;
    name: string;
    description: string;
    image: string;
    statistics: ProjectStatistics;
}
