import { Repository } from "@/api/models/Repository";
import { Tag } from "@/api/models/Tag";

export class Branch {
    id: number;
    name: string;
    url: string;
    repository: Repository;
    tags: Tag[];
    featured: boolean;
}
