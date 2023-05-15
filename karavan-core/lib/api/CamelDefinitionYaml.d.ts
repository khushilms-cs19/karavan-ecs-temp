import { Integration, CamelElement, Beans } from "../model/IntegrationDefinition";
export declare class CamelDefinitionYaml {
    static integrationToYaml: (integration: Integration) => string;
    static cleanupElement: (element: CamelElement, inArray?: boolean, inSteps?: boolean) => CamelElement;
    static cleanupElements: (elements: CamelElement[], inSteps?: boolean) => CamelElement[];
    static yamlDump: (integration: Integration) => string;
    static replacer: (key: string, value: any) => any;
    static yamlToIntegration: (filename: string, text: string) => Integration;
    static yamlIsIntegration: (text: string) => boolean;
    static flowsToCamelElements: (flows: any[]) => any[];
    static readBeanDefinition: (beans: any) => Beans;
    static flatMapProperty: (key: string, value: any, properties: Map<string, any>) => Map<string, any>;
    static addYamlToIntegrationYaml: (filename: string, camelYaml: string | undefined, restYaml: string, addREST: boolean, addRoutes: boolean) => string;
}
