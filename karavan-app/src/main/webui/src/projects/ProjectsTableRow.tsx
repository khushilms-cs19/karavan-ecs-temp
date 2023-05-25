import React from 'react';
import {
    Button,
    Badge,
    Tooltip,
    Flex, FlexItem
} from '@patternfly/react-core';
import '../designer/karavan.css';
import {DeploymentStatus, Project} from "./ProjectModels";
import {Td, Tr} from "@patternfly/react-table";
import DeleteIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
import CopyIcon from "@patternfly/react-icons/dist/esm/icons/copy-icon";

interface Props {
    config: any,
    onSelect: (project: Project) => void
    onProjectDelete: (project: Project) => void
    onProjectCopy: (project: Project) => void
    project: Project
    deploymentStatuses: DeploymentStatus[]
    handleProjectClick: () => void
}

interface State {

}

export class ProjectsTableRow extends React.Component<Props, State> {

    public state: State = {
    };

    getEnvironments(): string [] {
        return this.props.config.environments && Array.isArray(this.props.config.environments) ? Array.from(this.props.config.environments) : [];
    }

    getDeploymentByEnvironments(name: string): [string, DeploymentStatus | undefined] [] {
        const deps = this.props.deploymentStatuses;
        return this.getEnvironments().map(e => {
            const env: string = e as string;
            const dep = deps.find(d => d.name === name && d.env === env);
            return [env, dep];
        });
    }

    render() {
        const {project, onProjectDelete, onSelect, onProjectCopy} = this.props;
        const isBuildIn = ['kamelets', 'templates'].includes(project.projectId);
        const badge = isBuildIn ? project.projectId.toUpperCase().charAt(0) : project.runtime.substring(0, 1).toUpperCase();
        return (
            <Tr key={project.projectId}>
                <Td modifier={"fitContent"}>
                    <Tooltip content={project.runtime} position={"left"}>
                        <Badge isRead={isBuildIn} className="runtime-badge">{badge}</Badge>
                    </Tooltip>
                </Td>
                <Td>
                    <Button style={{padding: '6px'}} variant={"link"} onClick={(e) => {
                            onSelect?.call(this, project); 
                            this.props.handleProjectClick();
                    }}>
                        {project.projectId}
                    </Button>
                </Td>
                <Td>{project.name}</Td>
                <Td>{project.description}</Td>
                <Td isActionCell>
                    <Tooltip content={project.lastCommit} position={"bottom"}>
                        <Badge>
                            {/* {project.lastCommit?.substr(0, 7)} */}
                            {/* {project.lastCommit.toString()?.substr(0, 7)} */}
                            {/* {project.lastCommit} */}
                        </Badge>
                    </Tooltip>
                </Td>
                <Td noPadding style={{width: "180px"}}>
                    {!isBuildIn &&
                        <Flex direction={{default: "row"}}>
                            {this.getDeploymentByEnvironments(project.projectId).map(value => (
                                <FlexItem className="badge-flex-item" key={value[0]}>
                                    <Badge className="badge" isRead={!value[1]}>{value[0]}</Badge>
                                </FlexItem>
                            ))}
                        </Flex>
                    }
                </Td>
                <Td className="project-action-buttons">
                    {!isBuildIn &&
                        <Flex direction={{default: "row"}} justifyContent={{default: "justifyContentFlexEnd"}} spaceItems={{ default: 'spaceItemsNone' }}>
                            <FlexItem>
                                <Tooltip content={"Copy project"} position={"bottom"}>
                                    <Button variant={"plain"} icon={<CopyIcon/>}
                                            onClick={e => onProjectCopy.call(this, project)}></Button>
                                </Tooltip>
                            </FlexItem>
                            <FlexItem>
                                <Tooltip content={"Delete project"} position={"bottom"}>
                                    <Button variant={"plain"} icon={<DeleteIcon/>} onClick={e => onProjectDelete.call(this, project)}></Button>
                                </Tooltip>
                            </FlexItem>
                        </Flex>
                    }
                </Td>
            </Tr>
        )
    }
}