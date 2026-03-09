

import { config } from '../playwright.config';
import { ProjectTestConfigBrowsers, ProjectTestConfigCredentials} from './models/projectTestConfigRadafirst';

export const configParameters = config.use as MyConfigParameters;

export class MyConfigParameters {
    baseURL!: string;
    erickVar!: string;
    erickVarString!: string;
    erickVarInt!: number;
    erickVarFloat!: number;
    erickVarBoolean!: boolean;
    credentials!: ProjectTestConfigCredentials;
    browsers!: ProjectTestConfigBrowsers[];
}