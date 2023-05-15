import { Integration, CamelElement } from "../model/IntegrationDefinition";
import { NamedBeanDefinition, RouteConfigurationDefinition } from "../model/CamelDefinition";
import { KameletModel, Property } from "../model/KameletModels";
import { ComponentProperty } from "../model/ComponentModels";
export declare class CamelUtil {
    static cloneIntegration: (integration: Integration) => Integration;
    static cloneStep: (step: CamelElement, generateUuids?: boolean) => CamelElement;
    static cloneBean: (bean: NamedBeanDefinition) => NamedBeanDefinition;
    static cloneRouteConfiguration: (routeConfiguration: RouteConfigurationDefinition) => RouteConfigurationDefinition;
    static capitalizeName: (name: string) => string;
    static camelizeName: (name: string, separator: string, firstSmall: boolean) => string;
    static camelizeBody: (name: string, body: any, clone: boolean) => any;
    static camelizeObject: (body: any) => any;
    static isKameletComponent: (element: CamelElement | undefined) => boolean;
    static getKamelet: (element: CamelElement) => KameletModel | undefined;
    static getKameletProperties: (element: any) => Property[];
    static getKameletRequiredParameters: (element: any) => string[];
    static getComponentProperties: (element: any) => ComponentProperty[];
    static checkRequired: (element: CamelElement) => [boolean, string[]];
    static findPlaceholdersInObject: (item: any, result?: Set<string>) => Set<string>;
    static findPlaceholdersInArray: (items: any[] | undefined, result?: Set<string>) => Set<string>;
    static findPlaceholder: (value: string) => [boolean, string?];
}
