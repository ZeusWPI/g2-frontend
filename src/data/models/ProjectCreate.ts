import Model from "../structs/Model";

export default class ProjectCreate implements Model {
    public id: number;

    public parse(json: any): void {
        this.id = json.new_project_id;
    }
}
