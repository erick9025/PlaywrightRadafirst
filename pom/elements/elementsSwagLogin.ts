import { ElementsSwag } from "./elementsSwag";

export class ElementsSwagLogin implements ElementsSwag {
    //Define locators that should return SINGLE element
    public readonly pageHeader: string = ".login_logo";
    public readonly inputUser: string = "#user-name";
    public readonly inputPassword: string = "#password";
    public readonly buttonLogin: string = "#login-button,.submit-button"; // Sample OR CLAUSE with CSS Selector (comma ',')    
}