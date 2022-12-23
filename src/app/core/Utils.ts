export class Utils {
    /**
     * Returns a random integer.
     * @param min (inclusive)
     * @param max (inclusive)
     */
    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Returns a random float.
     * @param min (inclusive)
     * @param max (exclusive)
     */
    public static getRandomFloat(min: number, max: number): number {
        return (Math.random() * (max - min) + min);
    }

    /**
     * Returns a random item into the array.
     * @param arr
     */
    public static getRandomItem(arr: any[]): any {
        return arr[Math.floor((Math.random() * arr.length))];
    }
}
