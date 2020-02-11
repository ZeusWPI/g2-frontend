export default interface Model {
    parse(json: any): void;
}

export class ModelFactory {
    create<T>(type: new () => T): T {
        return new type();
    }
}
