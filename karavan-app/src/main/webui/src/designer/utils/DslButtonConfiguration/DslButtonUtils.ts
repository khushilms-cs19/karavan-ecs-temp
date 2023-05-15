import { getBeanCodeFromChatGPT, getValidationQueryFromChatGPT } from "./Functions";

interface Object {
    [key: string]: any
}
export const allowedDslNames = [
    'BeanDefinition',
    'ValidateDefinition',
];

export const labels : Object= {
    "BeanDefinition" : 'Get Code',
    'ValidateDefinition' : 'Get Validation Query'
}

export const functionsForDsl : Object= {
    "BeanDefinition" : getBeanCodeFromChatGPT,
    'ValidateDefinition' : getValidationQueryFromChatGPT
}