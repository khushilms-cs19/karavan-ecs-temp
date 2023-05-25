import Editor from "@monaco-editor/react";
import { Button, Flex, FlexItem, Modal, Spinner } from "@patternfly/react-core";
import React from "react";
import { KaravanApi } from "../../../api/KaravanApi";
import { ProjectFile } from "../../../projects/ProjectModels";
import { functionsForDsl } from "../DslButtonConfiguration/DslButtonUtils";
import { API_URL } from "../../../constants/mongoAPIs";
import axios from 'axios';
interface Props {
    setShowModal: (val: boolean) => void
    showModal: boolean
    code: string
    setIsLoading: (val: boolean) => void
    payload: any
    isLoading: boolean
    setCode: (val: string) => void
}

const CodeEditorModal = (props: Props) => {

    const handleModalToggle = () => {
        props.setShowModal(false);
        props.setIsLoading(true);
    };

    const handleConfirmClick = async () => {
        // const file = new ProjectFile(props.payload.className + '.java', props.payload.projectId, props.code, Date.now());
        // KaravanApi.postProjectFile(file, res => {
        //     if (res.status === 200) {
        //         console.log('File created successfully');
        //     }
        //     else console.log('Error creating file');
        // })
        await axios.post(`/${API_URL}/file`, {
            name: props.payload.className + '.java',
            code: props.code,
            projectId: props.payload.projectId,
            lastUpdate: Date.now(),
            userId: 1
        }).then((res: any) => console.log(res))
            .catch((err: any) => console.log(err));

        handleModalToggle();
    };

    return (
        <Modal
            width={props.isLoading ? '40%' : '80%'}
            title={props.isLoading ? 'Generating code..' : props.payload.className + '.java'}
            isOpen={props.showModal}
            onClose={handleModalToggle}
            actions={props.isLoading ? [] : [
                <Button key='Regenerate' variant="secondary" onClick={() => { props.setIsLoading(true); functionsForDsl['BeanDefinition'](props.payload, props.setCode, props.setIsLoading); }}>
                    Regenerate
                </Button>,
                <Button key="confirm" variant="primary" onClick={handleConfirmClick} >
                    Confirm
                </Button>,
                <Button key="cancel" variant="link" onClick={handleModalToggle}>
                    Cancel
                </Button>
            ]}
        >
            {props.isLoading ?
                <Flex direction={{ default: 'column' }} alignItems={{ default: 'alignItemsCenter' }} justifyContent={{ default: 'justifyContentCenter' }}>
                    <FlexItem><Spinner isSVG diameter="80px" /> </FlexItem>
                    <FlexItem><h1>Please wait while we are generating the code for you ...</h1></FlexItem>
                </Flex> :
                <Editor
                    height="90vh"
                    defaultLanguage="java"
                    defaultValue={props.code}
                    theme='vs-dark'
                    onChange={(value) => { props.setCode(value ? value : '') }}
                />
            }
        </Modal>
    );
}

export default CodeEditorModal;