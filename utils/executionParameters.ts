export class ExecutionParameters {
    private static _expectedTotal : number = 0;

    public static get expectedTotal(): number {
        return this._expectedTotal;
    }

    public static set expectedTotal(total: number) {
        this._expectedTotal = total;
    }
}