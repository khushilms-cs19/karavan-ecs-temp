export declare class ProjectProperty {
    id: string;
    key: string;
    value: any;
    constructor(init?: Partial<ProjectProperty>);
    static createNew(key: string, value: any): ProjectProperty;
}
export declare class ProjectModel {
    properties: ProjectProperty[];
    constructor(init?: Partial<ProjectModel>);
    static createNew(init?: Partial<ProjectModel>): ProjectModel;
}
