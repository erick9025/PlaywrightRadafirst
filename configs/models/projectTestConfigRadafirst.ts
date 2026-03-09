import { PlaywrightTestConfig } from "@playwright/test"; 

export interface ProjectTestConfigRadafirst extends PlaywrightTestConfig {
    use: PlaywrightTestConfig['use'] & {
      baseURL: string;
      erickVar: string;
      erickVarString: string;
      erickVarInt: number;
      erickVarFloat: number;
      erickVarBoolean: boolean;
      credentials: ProjectTestConfigCredentials;
      browsers: ProjectTestConfigBrowsers[];
    }
}

export interface ProjectTestConfigBrowsers
{
    name: string;
    description: string;
}

export interface ProjectTestConfigCredentials
{
    myUsername: string;
    myPassword: string;
}