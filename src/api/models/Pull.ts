import { Author } from "@/api/models/Author";
import { Repository } from "@/api/models/Repository";
import { Label } from "@/api/models/Label";

export class Pull {
    id: number;
    title: string;
    timestamp: number;
    status: "open" | "closed";
    author: Author;
    repository: Repository;
    labels: Label[];
}
