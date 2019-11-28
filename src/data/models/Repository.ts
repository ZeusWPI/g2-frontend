import Model from "../structs/Model";

export default class Repository implements Model {
    public id: number;
    public git_id: number;
    public project_id: number;
    public name: string;
    public description: string;
    public image: string;

    public parse(json: any): void {
        this.id = json.repo_id;
        this.git_id = json.git_id;
        this.project_id = json.project_id;
        this.name = json.name;
        this.description = json.description;
        this.image = json.image;
    }
}
