import { NamedBeanDefinition } from "./CamelDefinition";
export declare class Spec {
    flows?: any[];
    constructor(init?: Partial<Spec>);
}
export declare class Metadata {
    name: string;
    constructor(init?: Partial<Metadata>);
}
export declare class Integration {
    apiVersion: string;
    kind: string;
    metadata: Metadata;
    spec: Spec;
    type: 'crd' | 'plain' | 'kamelet';
    constructor(init?: Partial<Integration>);
    static createNew(name?: string, type?: 'crd' | 'plain' | 'kamelet'): Integration;
}
export declare class CamelElement {
    uuid: string;
    dslName: string;
    show: boolean;
    constructor(dslName: string);
    hasId(): boolean;
    hasSteps(): boolean;
    hasStepName(): boolean;
}
export declare class Beans extends CamelElement {
    beans: NamedBeanDefinition[];
    constructor(init?: Partial<Beans>);
}
export declare class CamelElementMeta {
    step?: CamelElement;
    parentUuid?: string;
    position: number;
    constructor(step?: CamelElement, parentUuid?: string, position?: number);
}
