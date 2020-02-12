import Model from "./Model";

export default class Query<T> {
    public loading: boolean;
    public data: T | any;
    public error: string;
}
