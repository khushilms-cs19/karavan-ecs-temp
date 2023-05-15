export declare const TemplateApi: {
    saveTemplates: (templates: Map<string, string>, clean?: boolean) => void;
    saveTemplate: (name: string, code: string) => void;
    getTemplate: (name: string) => string | undefined;
    generateCode: (name: string, beanName: string) => string | undefined;
    saveJavaCodes: (javaCode: Map<string, string>, clean?: boolean) => void;
    saveJavaCode: (name: string, code: string) => void;
    getJavaCode: (name: string) => string | undefined;
};
