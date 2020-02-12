import Model from "../structs/Model";

export default class Project implements Model {
    public id: number;
    public name: string;
    public description: string;
    public repo_ids: Array<number>;

    public parse(json: any): void {
        this.id = json.project_id;
        this.name = json.name;
        this.description = json.description;
        this.repo_ids =
            json.repo_ids && typeof json.repo_ids === "string"
                ? json.repo_ids.split(",")
                : [];
    }
}
