import { UserInformation } from "../models/userInformation";

export class ExecutionParameters {
    private static _expectedTotal : number = 0;

    public static get expectedTotal(): number {
        return this._expectedTotal;
    }

    public static set expectedTotal(total: number) {
        this._expectedTotal = total;
    }

    private static _userObject : UserInformation;

    public static get userObject(): UserInformation {
        return this._userObject;
    }

    public static set userObject(user: UserInformation) {
        this._userObject = user;
    }
}