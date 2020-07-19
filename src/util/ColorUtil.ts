export class ColorUtil {
    /**
     * Convert a string to a color.
     * @param string String to use.
     */
    static getColorFromString(string: string): string {
        let hash = 0;

        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        hash %= 360;

        return `hsl(${hash}, 100%, 30%)`;
    }
}
