import { Author } from "@/api/models/Author";
import { Repository } from "@/api/models/Repository";
import { Label } from "@/api/models/Label";

export class Issue {
    id: number;
    title: string;
    timestamp: number;
    author: Author;
    repository: Repository;
    labels: Label[];
}
