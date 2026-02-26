import { ConstantsSwag } from "./constantsSwag";

export class ConstantsLoginPage implements ConstantsSwag {
    public readonly expectedPageHeader: string = "Swag Labs";

    /*
    Accepted usernames are:
        standard_user
        locked_out_user
        problem_user
        performance_glitch_user
        error_user
        visual_user
    */
    public readonly userStandard: string = "standard_user";

    /*
    Password for all users:
        secret_sauce
    */
    public readonly correctPassword: string = "secret_sauce";
}