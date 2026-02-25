import { Page } from '@playwright/test';
import { BasePage } from "./basePage";
import { ConstantsSwag } from '../constants/constantsSwag';
import { ElementsSwag } from '../elements/elementsSwag';

export abstract class SwagParentPage<TElements extends ElementsSwag, TConstants extends ConstantsSwag> extends BasePage {
    protected readonly elements: TElements;
    protected readonly constants: TConstants;

    constructor(page: Page) {
        // Call parent constructor first
        super(page);

        this.elements = this.createElements();
        this.constants = this.createConstants();
    }

    protected abstract createElements(): TElements;
    protected abstract createConstants(): TConstants;
}