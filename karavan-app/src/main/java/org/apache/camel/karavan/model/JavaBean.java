package org.apache.camel.karavan.model;

public class JavaBean {

    private String className;

    private String ref;

    private String method;

    private String codeDescription;

    private String description;

    private String code;

    public JavaBean(String className, String ref, String method, String codeDescription, String description) {
        this.className = className;
        this.ref = ref;
        this.method = method;
        this.codeDescription = codeDescription;
        this.description = description;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getRef() {
        return ref;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getCodeDescription() {
        return codeDescription;
    }

    public void setCodeDescription(String codeDescription) {
        this.codeDescription = codeDescription;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "JavaBean{" +
                "class='" + className + '\'' +
                ", method='" + method + '\'' +
                ", codeDescription='" + codeDescription + '\'' +
                ", description='" + description +
                '}';
    }
}
