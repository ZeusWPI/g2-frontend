export class SelectItem<T> {
    text: string | number | T;
    value: string | number | T;
    disabled?: boolean;
    divider?: boolean;
    header?: string;
}
