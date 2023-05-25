import React from 'react';
import axios from 'axios';
import {
    Alert,
    Toolbar,
    ToolbarContent,
    ToolbarItem,
    TextInput,
    PageSection,
    TextContent,
    Text,
    Button,
    Modal,
    FormGroup,
    ModalVariant,
    Form,
    Bullseye,
    EmptyState,
    EmptyStateVariant,
    EmptyStateIcon,
    Title,
    Radio, Spinner, FlexItem, Flex, TextInputGroup, Switch
} from '@patternfly/react-core';
import '../designer/karavan.css';
import { MainToolbar } from "../MainToolbar";
import RefreshIcon from '@patternfly/react-icons/dist/esm/icons/sync-alt-icon';
import PlusIcon from '@patternfly/react-icons/dist/esm/icons/plus-icon';
import { DeploymentStatus, Project, PipelineStatus } from "./ProjectModels";
import { TableComposable, Tbody, Td, Th, Thead, Tr } from "@patternfly/react-table";
import SearchIcon from '@patternfly/react-icons/dist/esm/icons/search-icon';
import {CamelUi} from "../designer/utils/CamelUi";
import {KaravanApi} from "../api/KaravanApi";
import {QuarkusIcon, SpringIcon} from "../designer/utils/KaravanIcons";
import {CamelUtil} from "karavan-core/lib/api/CamelUtil";
import {ProjectsTableRow} from "./ProjectsTableRow";
import { API_URL } from '../constants/mongoAPIs';
import { StorageApi } from '../api/StorageApi';


interface Props {
    config: any,
    onSelect: (project: Project) => void
    toast: (title: string, text: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'default') => void
}

interface State {
    projects: Project[],
    allProjects: Project[],
    deploymentStatuses: DeploymentStatus[],
    isCreateModalOpen: boolean,
    isDeleteModalOpen: boolean,
    isProjectDeploymentModalOpen: boolean,
    isCopy: boolean,
    loading: boolean,
    projectToCopy?: Project,
    projectToDelete?: Project,
    filter: string,
    name: string,
    description: string,
    projectId: string,
    runtime: string,
    accessToken: string,
    repoUri: string,
    branch: string,
    repoOwner: string,
    isUploading: boolean,
    isUploadModalOpen: boolean,
    saveUserDetails: boolean,
    userId: string
}

export class ProjectsPage extends React.Component<Props, State> {

    public state: State = {
        projects: [],
        allProjects: [],
        deploymentStatuses: [],
        isCreateModalOpen: false,
        isDeleteModalOpen: false,
        isProjectDeploymentModalOpen: false,
        isCopy: false,
        loading: true,
        filter: '',
        name: '',
        description: '',
        projectId: '',
        runtime: this.props.config.runtime,
        accessToken: '',
        repoUri: '',
        branch: '',
        repoOwner: '',
        isUploading: false,
        isUploadModalOpen: false,
        saveUserDetails: false,
        userId: '1'
    };
    interval: any;

    componentDidMount () {
        this.interval = setInterval(() => this.fetchAllProjects(), 5000);
        this.fetchAllProjects();
        const githubParams = StorageApi.getGithubParameters();
        if (githubParams) {
            this.setState({
                repoOwner: githubParams.repoOwner,
                accessToken: githubParams.accessToken,
                repoUri: githubParams.repoUri,
                branch: githubParams.branch,
            });
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if((prevState.isCreateModalOpen !== this.state.isCreateModalOpen) || (prevState.isDeleteModalOpen !== this.state.isDeleteModalOpen)) {
            this.fetchAllProjects();
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onProjectDelete = (project: Project) => {
        KaravanApi.getProjectPipelineStatus(project.projectId, this.props.config.environment, (status?: PipelineStatus) => {
            if (status?.result === "Running" || status?.result === "Started") {
                this.setState({ isProjectDeploymentModalOpen: true, projectToDelete: project })
            } else {
                KaravanApi.getProjectDeploymentStatus(project.projectId, this.props.config.environment, (status?: DeploymentStatus) => {
                    if (status === undefined) {
                        this.setState({ isDeleteModalOpen: true, projectToDelete: project })
                    }
                    else {
                        this.setState({ isProjectDeploymentModalOpen: true, projectToDelete: project })
                    }
                });
            }
        });
    };


    deleteProject = async () => {
        if (this.state.projectToDelete){
            console.log("Deleting project: " + this.state.projectToDelete.name);
            await axios.delete(`/${API_URL}/project/1/${this.state.projectToDelete.projectId}`)
            KaravanApi.deleteProject(this.state.projectToDelete, res => {
                if (res.status === 204) {
                    console.log("Project deleted");
                    this.props.toast?.call(this, "Success", "Project deleted", "success");
                    this.onGetProjects();
                } else {
                    console.log("project not deleted");
                    this.props.toast?.call(this, "Error", res.statusText, "danger");
                }
            });
        }
        this.setState({isDeleteModalOpen: false})
    }

    onProjectCreate = (project: Project) => {
        KaravanApi.postProject(project, res => {
            console.log(res.status)
            if (res.status === 200 || res.status === 201) {
                this.props.toast?.call(this, "Success", "Project created", "success");
            } else {
                this.props.toast?.call(this, "Error", res.status + ", " + res.statusText, "danger");
            }
        });
    };

    fetchAllProjects = async() => {
        await axios.get(`/${API_URL}/projects/1`)
            .then(res => {
                const projects = res.data;
                this.setState({ allProjects: projects });
            })
    }

    onGetProjects = () => {
        this.setState({ loading: true });
        KaravanApi.getProjects((projects: Project[]) => {
            this.setState({ projects: projects, loading: false })
        });
        KaravanApi.getDeploymentStatuses(this.props.config.environment, (statuses: DeploymentStatus[]) => {
            this.setState({ deploymentStatuses: statuses });
        });
    }

    tools = () => (<Toolbar id="toolbar-group-types">
        <ToolbarContent>
            <ToolbarItem>
                <Button variant="link" icon={<RefreshIcon />} onClick={e => this.onGetProjects()} />
            </ToolbarItem>
            <ToolbarItem>
                <TextInput className="text-field" type="search" id="search" name="search"
                    autoComplete="off" placeholder="Search by name"
                    value={this.state.filter}
                    onChange={e => this.setState({ filter: e })} />
            </ToolbarItem>
            <ToolbarItem>
                <Flex className="toolbar" direction={{default: "row"}} alignItems={{default: "alignItemsCenter"}}>
                    <Button icon={<PlusIcon />} onClick={e => this.setState({ isCreateModalOpen: true, isCopy: false })}>Create</Button>
                    <Button icon={<PlusIcon/>} onClick={e => this.setState({isUploadModalOpen: true, isCopy: false})}>Upload</Button>
                </Flex>
            </ToolbarItem>
        </ToolbarContent>
    </Toolbar>);

    title = () => (<TextContent>
        <Text component="h2">Projects</Text>
    </TextContent>);

    closeModal = () => {
        this.setState({ isCreateModalOpen: false, isCopy: false, name: this.props.config.groupId, description: '', projectId: '', runtime: this.props.config.runtime });
        this.onGetProjects();
    }

    sendProjectDetails = async () => {
        const {name, description, projectId, runtime} = this.state;
        await axios.post(`/${API_URL}/project`, {
            name: name,
            description: description,
            projectId: projectId,
            runtime: runtime,
            lastCommit: '',
            userId: 1
        })
            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
    }

    saveAndCloseCreateModal = async () => {
        const {name, description, projectId, runtime} = this.state;
        await this.sendProjectDetails();
        const p = new Project(projectId, name, description, runtime, '');
        this.onProjectCreate(p);
        this.setState({ isCreateModalOpen: false, isCopy: false, name: this.props.config.groupId, description: '', projectId: '' });
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === 'Enter' && this.state.name !== undefined && this.state.description !== undefined && this.state.projectId !== undefined) {
            this.saveAndCloseCreateModal();
        }
    }

    onUpload = (after?: () => void) => {
        this.setState({isUploading: true});
        const {repoOwner, repoUri, branch, accessToken, saveUserDetails} = this.state;

        const githubParams = {
            "repoOwner": repoOwner,
            "accessToken":accessToken,
            "repoUri": repoUri,
            "branch": branch,
        };
        let projects = this.state.allProjects.reduce((acc, project) => {
            return acc + project.projectId + ",";
          }, "");
        const params = {...githubParams,projects: projects,userId:this.state.userId};
        
        if (saveUserDetails) {
            StorageApi.setGithubParameters({
                ...githubParams, accessToken: "",
                userName: '',
                commitMessage: '',
                userEmail: ''
            })
        }
        KaravanApi.uploadFromGit(params, res => {
            if (res.status === 200 || res.status === 201) {
                this.setState({isUploading: false});
                this.fetchAllProjects();
                after?.call(this);
            } else {
                console.log(res);
                // Todo notification
                //need to render to an error page
            }
            this.setState({isUploadModalOpen: false, isUploading: false});
        });
    }

    createModalForm() {
        const { isCopy, projectToCopy, projectId, name, isCreateModalOpen, description, runtime } = this.state;
        const { runtimes } = this.props.config;
        const isReady = projectId && name && description && !['templates', 'kamelets'].includes(projectId);
        return (
            <Modal
                title={!isCopy ? "Create new project" : "Copy project from " + projectToCopy?.projectId}
                variant={ModalVariant.small}
                isOpen={isCreateModalOpen}
                onClose={this.closeModal}
                onKeyDown={this.onKeyDown}
                actions={[
                    <Button key="confirm" variant="primary" isDisabled={!isReady} onClick={this.saveAndCloseCreateModal}>Save</Button>,
                    <Button key="cancel" variant="secondary" onClick={this.closeModal}>Cancel</Button>
                ]}
                className="new-project"
            >
                <Form isHorizontal={true} autoComplete="off">
                    <FormGroup label="Name" fieldId="name" isRequired>
                        <TextInput className="text-field" type="text" id="name" name="name"
                            value={name}
                            onChange={e => this.setState({ name: e })} />
                    </FormGroup>
                    <FormGroup label="Description" fieldId="description" isRequired>
                        <TextInput className="text-field" type="text" id="description" name="description"
                            value={description}
                            onChange={e => this.setState({ description: e })} />
                    </FormGroup>
                    <FormGroup label="Project ID" fieldId="projectId" isRequired helperText="Unique project name">
                        <TextInput className="text-field" type="text" id="projectId" name="projectId"
                            value={projectId}
                            onFocus={e => this.setState({ projectId: projectId === '' ? CamelUi.nameFromTitle(name) : projectId })}
                            onChange={e => this.setState({ projectId: CamelUi.nameFromTitle(e) })} />
                    </FormGroup>
                    <FormGroup label="Runtime" fieldId="runtime" isRequired>
                        {runtimes?.map((r: string) => (
                            <Radio key={r} id={r} name={r} className="radio"
                                isChecked={r === runtime}
                                onChange={checked => {
                                    if (checked) this.setState({ runtime: r })
                                }}
                                body={
                                    <div className="runtime-radio">
                                        {r === 'quarkus' ? QuarkusIcon() : SpringIcon()}
                                        <div className="runtime-label">{CamelUtil.capitalizeName(r)}</div>
                                    </div>}
                            />
                        ))}
                    </FormGroup>
                </Form>
            </Modal>
        )
    }

        uploadModalForm() {
        const {accessToken,repoUri,branch,repoOwner,isUploading,isUploadModalOpen,saveUserDetails} = this.state;
        const isUploadEnabled = !isUploading&&accessToken && repoUri && branch && repoOwner;
        return (
            <Modal
                title="Upload project from github"
                className="github-modal"
                variant={ModalVariant.medium}
                isOpen={isUploadModalOpen}
                onClose={() => this.setState({isUploadModalOpen: false})}
                actions={[
                    <Button isLoading={isUploading} isDisabled={!isUploadEnabled} key="confirm" variant="primary" onClick={() => this.onUpload()} >Upload</Button>,
                    <Button key="cancel" variant="secondary" onClick={() => this.setState({isUploadModalOpen: false,isUploading:false})}>Cancel</Button>,
                ]}
            >
                <Form autoComplete="off" isHorizontal className="create-file-form">
                    <FormGroup label="Repository" fieldId="repository" isRequired>
                        <Flex direction={{default: "row"}} justifyContent={{default: "justifyContentSpaceBetween"}} alignItems={{default: "alignItemsStretch"}}>
                            <FlexItem>
                                <TextInput id="owner" placeholder="Owner" value={repoOwner} onChange={value => this.setState({repoOwner: value})}/>
                            </FlexItem>
                            <FlexItem>
                                <TextInput id="repo" placeholder="Repo" value={repoUri} onChange={value => this.setState({repoUri: value})}/>
                            </FlexItem>
                            <FlexItem>
                                <TextInput id="branch" placeholder="branch" value={branch} onChange={value => this.setState({branch: value})}/>
                            </FlexItem>
                        </Flex>
                    </FormGroup>
                    <FormGroup label="Access Token" fieldId="access-token" isRequired>
                        <TextInput value={accessToken} type="password" onChange={value => this.setState({accessToken: value})}/>
                    </FormGroup>
                    <FormGroup label="Save" fieldId="save" isRequired>
                        <TextInputGroup className="input-group">
                            <Switch label="Save parameters in browser (except token)" checked={saveUserDetails} onChange={checked => this.setState({saveUserDetails: checked})}/>
                        </TextInputGroup>
                    </FormGroup>
                </Form>
            </Modal>
        )
    }

    deleteModalForm() {
        return (
            <div onKeyPress={(event) => {
                if (event.key === 'Enter' && this.state.isDeleteModalOpen)
                    this.deleteProject();
            }}>
                {(this.state.isDeleteModalOpen === true) && <Modal
                    title="Confirmation"
                    variant={ModalVariant.small}
                    isOpen={this.state.isDeleteModalOpen}
                    onClose={() => this.setState({ isDeleteModalOpen: false })}
                    actions={[
                        <Button key="confirm" variant="primary" onClick={e => this.deleteProject()}>Delete</Button>,
                        <Button key="cancel" variant="link"
                            onClick={e => this.setState({ isDeleteModalOpen: false })}>Cancel</Button>
                    ]}
                    onEscapePress={e => this.setState({ isDeleteModalOpen: false })}>
                    <div>{"Are you sure you want to delete the project " + this.state.projectToDelete?.projectId + "?"}</div>
                </Modal>
                }
                {(this.state.isProjectDeploymentModalOpen === true) && <Modal
                    variant={ModalVariant.small}
                    isOpen={this.state.isProjectDeploymentModalOpen}
                    onClose={() => this.setState({ isProjectDeploymentModalOpen: false })}
                    onEscapePress={e => this.setState({ isProjectDeploymentModalOpen: false })}>
                    <div>
                        <Alert key={this.state.projectToDelete?.projectId} className="main-alert" variant="warning"
                            title={"Deployment is Running!!"} isInline={true} isPlain={true}>
                            {"Delete the deployment (" + this.state.projectToDelete?.projectId + ")" + " first."}
                        </Alert>
                    </div>
                </Modal>

                }
            </div>
        )
    }

    getEnvironments(): string[] {
        return this.props.config.environments && Array.isArray(this.props.config.environments) ? Array.from(this.props.config.environments) : [];
    }

    getEmptyState() {
        const { loading } = this.state;
        return (
            <Tr>
                <Td colSpan={8}>
                    <Bullseye>
                        {loading && <Spinner className="progress-stepper" isSVG diameter="80px" aria-label="Loading..." />}
                        {!loading &&
                            <EmptyState variant={EmptyStateVariant.small}>
                                <EmptyStateIcon icon={SearchIcon} />
                                <Title headingLevel="h2" size="lg">
                                    No results found
                                </Title>
                            </EmptyState>
                        }
                    </Bullseye>
                </Td>
            </Tr>
        )
    }


    getProjectsTable() {
        const {projects, filter, allProjects} = this.state;
        const projs = projects.filter(p => p.name.toLowerCase().includes(filter) || p.description.toLowerCase().includes(filter));
        const allProjs = allProjects.filter(p => p.name.toLowerCase().includes(filter) || p.description.toLowerCase().includes(filter));
        return (
            <TableComposable aria-label="Projects" variant={"compact"}>
                <Thead>
                    <Tr>
                        <Th key='type'>Runtime</Th>
                        <Th key='projectId'>Project ID</Th>
                        <Th key='name'>Name</Th>
                        <Th key='description'>Description</Th>
                        <Th key='commit'>Commit</Th>
                        <Th key='deployment'>Environment</Th>
                        <Th key='action'></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {allProjs.map(project => (
                        <ProjectsTableRow
                            key={project.projectId}
                            config={this.props.config}
                            onSelect={this.props.onSelect}
                            onProjectDelete={this.onProjectDelete}
                            onProjectCopy={project1 => this.setState({ isCreateModalOpen: true, isCopy: true, projectToCopy: project1 })}
                            project={project}
                            deploymentStatuses={this.state.deploymentStatuses} />
                    ))}
                    {allProjs.length === 0 && this.getEmptyState()}
                </Tbody>
            </TableComposable>
        )
    }

    render() {
        return (
            <PageSection className="kamelet-section projects-page" padding={{ default: 'noPadding' }} style={{ minHeight: '100vh' }} >
                <PageSection className="tools-section" padding={{ default: 'noPadding' }}>
                    <MainToolbar title={this.title()} tools={this.tools()} />
                </PageSection>
                <PageSection isFilled className="kamelets-page">
                    {this.getProjectsTable()}
                </PageSection>
                {this.createModalForm()}
                {this.deleteModalForm()}
                {this.uploadModalForm()}
            </PageSection>
        )
    }
}