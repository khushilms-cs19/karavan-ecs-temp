export const getBeanCodeFromChatGPT = async(payload: any,setCode:(val:string)=>void, setIsLoading:(val:boolean)=> void) => {
    console.log('getBeanCodeFromChatGPT was invoked', payload);
    await fetch('/ai/getBean',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body:JSON.stringify({
            className:payload.className,
            ref : payload.ref,
            method : payload.method,
            description : payload.description,
            codeDescription : payload.codeDescription,
            })
    }).then(res => res.json()).then(data=>{
        setCode(data.code);
        setIsLoading(false);
    });

}

export const getValidationQueryFromChatGPT = () => {
    console.log('getValidationQueryFromChatGPT was invoked');
}
