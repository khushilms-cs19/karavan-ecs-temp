import { Integration, CamelElement } from "../model/IntegrationDefinition";
export declare class CamelDisplayUtil {
    static isStepDefinitionExpanded: (integration: Integration, stepUuid: string, selectedUuid: string | undefined) => boolean;
    static getParentStepDefinitions: (integration: Integration, uuid: string) => string[];
    static setIntegrationVisibility: (integration: Integration, selectedUuid: string | undefined) => Integration;
    static setElementVisibility: (step: CamelElement, showChildren: boolean, expandedUuids: string[]) => CamelElement;
    static setElementsVisibility: (steps: CamelElement[] | undefined, showChildren: boolean, expandedUuids: string[]) => CamelElement[];
}
