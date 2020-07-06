import { Repository } from "@/api/models/Repository";

export class Branch {
    id: number;
    name: string;
    url: string;
    repository: Repository;
}
