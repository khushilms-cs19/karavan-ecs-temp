/**
 * Generated by karavan build tools - do NOT edit this file!
 */
export declare class ElementMeta {
    name: string;
    className: string;
    title: string;
    description: string;
    labels: string;
    properties: PropertyMeta[];
    constructor(name: string, className: string, title: string, description: string, labels: string, properties: PropertyMeta[]);
}
export declare class PropertyMeta {
    name: string;
    displayName: string;
    description: string;
    type: string;
    enumVals: string;
    defaultValue: string;
    required: boolean;
    secret: boolean;
    isArray: boolean;
    isObject: boolean;
    label: string;
    javaType: string;
    constructor(name: string, displayName: string, description: string, type: string, enumVals: string, defaultValue: string, required: boolean, secret: boolean, isArray: boolean, isObject: boolean, label: string, javaType: string);
}
export declare class CamelMetadataApi {
    static getCamelModelMetadataByName: (name: string) => ElementMeta | undefined;
    static getCamelModelMetadataByClassName: (className: string) => ElementMeta | undefined;
    static getCamelDataFormatMetadataByName: (name: string) => ElementMeta | undefined;
    static getCamelDataFormatMetadataByClassName: (className: string) => ElementMeta | undefined;
    static getCamelLanguageMetadataByClassName: (className: string) => ElementMeta | undefined;
    static getCamelLanguageMetadataByName: (name: string) => ElementMeta | undefined;
    static getLanguage: (name: string) => [string, string, string] | undefined;
    static hasLanguage: (name: string) => boolean | undefined;
}
export declare const DataFormats: [string, string, string][];
export declare const CamelDataFormatMetadata: ElementMeta[];
export declare const Languages: [string, string, string][];
export declare const CamelLanguageMetadata: ElementMeta[];
export declare const CamelModelMetadata: ElementMeta[];
export declare const SensitiveKeys: string[];
