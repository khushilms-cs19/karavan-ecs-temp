import { Button } from "@patternfly/react-core";
import React from "react";
import { allowedDslNames, functionsForDsl, labels } from "./DslButtonUtils";

interface Props{
    dslName: string
    payload?: any
    setShowModal: (val:boolean) => void
    setCode: (val:string) => void
    setIsLoading: (val:boolean) => void
}

const DslButtonConfiguration = (props: Props) => {
    if(!allowedDslNames.includes(props.dslName)){
        return null;
    }
    else 
    return ( 
        <Button variant="primary" onClick={() =>{
            props.setShowModal(true);
            functionsForDsl[props.dslName](props.payload,props.setCode,props.setIsLoading);
            console.log('Props:',props);

        }}>{labels[props.dslName]}</Button>
     );
}
 
export default DslButtonConfiguration;