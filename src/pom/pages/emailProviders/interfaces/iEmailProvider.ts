export interface IEmailProvider {
    goTo() : any;

    login(user: string, password: string) : any;

    openEmail(subject: string, fromEmail: string) : any;
}

/*Interface declares for methods
-- Name
-- Params
-- Return type

xx Async or sync
xx Implementation (body)
xx Access modifiers (public/private/protected)
*/