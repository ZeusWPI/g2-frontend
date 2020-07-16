import { Author } from "@/api/models/Author";
import { Repository } from "@/api/models/Repository";
import { Label } from "@/api/models/Label";
import { Tag } from "@/api/models/Tag";

export class Pull {
    id: number;
    title: string;
    timestamp: number;
    status: "open" | "closed";
    url: string;
    author: Author;
    repository: Repository;
    labels: Label[];
    tags: Tag[];
    featured: boolean;
}
