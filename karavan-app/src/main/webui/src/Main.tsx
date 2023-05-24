import React from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {
    Page,
    Button,
    Flex,
    FlexItem,
    Tooltip,
    Divider, 
    Popover,
    Badge
} from '@patternfly/react-core';
import { KaravanApi } from "./api/KaravanApi";
import { SsoApi } from "./api/SsoApi";
import { KameletApi } from "karavan-core/lib/api/KameletApi";
import './designer/karavan.css';
import { v4 as uuidv4 } from "uuid";
import { ComponentApi } from "karavan-core/lib/api/ComponentApi";
import Icon from "./Logo";
import { ProjectsPage } from "./projects/ProjectsPage";
import { Project } from "./projects/ProjectModels";
import { ProjectPage } from "./projects/ProjectPage";
import UserIcon from "@patternfly/react-icons/dist/js/icons/user-icon";
import ProjectsIcon from "@patternfly/react-icons/dist/js/icons/repository-icon";
import DashboardIcon from "@patternfly/react-icons/dist/js/icons/tachometer-alt-icon";
import { DashboardPage } from "./dashboard/DashboardPage";
import Navbar from "./navbar/Navbar";
import { TimesIcon } from "@patternfly/react-icons";
import { LandingPage } from './pages/landingPage/LandingPage';
class ToastMessage {
    id: string = ''
    text: string = ''
    title: string = ''
    variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';

    constructor(title: string, text: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'default') {
        this.id = uuidv4();
        this.title = title;
        this.text = text;
        this.variant = variant;
    }
}

class MenuItem {
    pageId: string = '';
    tooltip: string = '';
    icon: any;

    constructor(pageId: string, tooltip: string, icon: any) {
        this.pageId = pageId;
        this.tooltip = tooltip;
        this.icon = icon;
    }
}

interface Props {
}

interface State {
    config: any,
    pageId: string,
    projects: Project[],
    project?: Project,
    isModalOpen: boolean,
    projectToDelete?: Project,
    openapi: string,
    alerts: ToastMessage[],
    request: string,
    filename: string,
    key: string,
    showUser?: boolean,
    showMenuModal: boolean
}

export class Main extends React.Component<Props, State> {

    public state: State = {
        config: {},
        pageId:  window.sessionStorage.getItem("pageId") ||"projects",
        projects: [],
        isModalOpen: false,
        alerts: [],
        request: uuidv4(),
        openapi: '',
        filename: '',
        key: '',
        showMenuModal: false,
        project: JSON.parse(localStorage.getItem('project') || '{}')
    };

    designer = React.createRef();

    setShowMenuModal = (showMenuModal: boolean) => {
        this.setState({ showMenuModal: showMenuModal });
    }

    componentDidMount() {
        KaravanApi.getAuthType((authType: string) => {
            console.log("authType", authType);
            if (authType === 'oidc') {
                SsoApi.auth(() => {
                    KaravanApi.getMe((user: any) => {
                        console.log("me", user);
                        this.getData();
                    });
                });
            } else {
                this.setState({ key: Math.random().toString() })
            }
            if (KaravanApi.isAuthorized || KaravanApi.authType === 'public') {
                this.getData();
            }
        });
        this.getData();
    }

    onLogin = (username: string, password: string) => {
        KaravanApi.auth(username, password, (res: any) => {
            if (res?.status === 200) {
                this.getData();
            } else {
                this.toast("Error", "Incorrect username and/or password!", "danger");
            }
        });
    }

    getData() {
        KaravanApi.getConfiguration((config: any) => {
            this.setState({ config: config, request: uuidv4() });
        });
        this.updateKamelets();
        this.updateComponents();
        this.updateSupportedComponents();
    }

    updateKamelets: () => Promise<void> = async () => {
        await new Promise(resolve => {
            KaravanApi.getKamelets(yamls => {
                const kamelets: string[] = [];
                yamls.split("\n---\n").map(c => c.trim()).forEach(z => kamelets.push(z));
                KameletApi.saveKamelets(kamelets, true);
            })
            KaravanApi.getCustomKameletNames(names => {
                KameletApi.saveCustomKameletNames(names);
            })
        });
    }

    updateComponents: () => Promise<void> = async () => {
        await new Promise(resolve => {
            KaravanApi.getComponents(code => {
                const components: [] = JSON.parse(code);
                const jsons: string[] = [];
                components.forEach(c => jsons.push(JSON.stringify(c)));
                ComponentApi.saveComponents(jsons, true);
            })
        });
    }

    updateSupportedComponents: () => Promise<void> = async () => {
        await new Promise(resolve => {
            KaravanApi.getSupportedComponents(jsons => {
                ComponentApi.saveSupportedComponents(jsons);
            })
        });
    }

    deleteErrorMessage = (id: string) => {
        this.setState({ alerts: this.state.alerts.filter(a => a.id !== id) })
    }

    pageNav = () => {
        const pages: MenuItem[] = [
            new MenuItem("dashboard", "Dashboard", <DashboardIcon color={this.state.pageId === 'dashboard' ? 'white' : 'var(--mck-deep-blue)'} />),
            new MenuItem("projects", "Projects", <ProjectsIcon color={this.state.pageId === 'projects' ? 'white' : 'var(--mck-deep-blue)'} />)
        ]
        return (<Flex className="nav-buttons" direction={{ default: "column" }} style={{ height: "100%", backgroundColor: "#E9E6E4", width: "250px" }}
            spaceItems={{ default: "spaceItemsNone" }}>
            <FlexItem alignSelf={{ default: "alignSelfCenter" }}  >
                <Flex direction={{ default: "row" }} justifyContent={{ default: "justifyContentCenter" }} alignItems={{ default: "alignItemsCenter" }} >
                    <FlexItem>
                        <Tooltip entryDelay={1000} className="logo-tooltip" content={"Apache Camel Karavan " + this.state.config.version}
                            position={"right"}>
                            {Icon()}
                        </Tooltip>
                    </FlexItem>
                    <FlexItem>
                        <span>Apache Karavan </span>
                    </FlexItem>
                    <FlexItem onClick={() => this.setShowMenuModal(false)} style={{ cursor: "pointer" }}>
                        <TimesIcon />
                    </FlexItem>
                </Flex>
            </FlexItem>
            {
                pages.map(page =>
                    <Link key={page.pageId} to={`/${page.pageId}`} style={{ textDecoration: 'none', color:'black' }} onClick={()=> this.setShowMenuModal(false)}  >
                    <Flex key={page.pageId} direction={{ default: "column" }} alignItems={{ default: "alignItemsCenter" }} style={{cursor:"pointer"}}>
                        <FlexItem alignSelf={{ default: "alignSelfFlexStart" }}
                            className={this.state.pageId === page.pageId ? "menubar-button-selected" : ""}
                            onClick={event => {
                                this.setState({ pageId: page.pageId });
                                window.sessionStorage.setItem("pageId", page.pageId);
                            }}
                            style={{ width: "100%" }}>
                            <Button id={page.pageId} icon={page.icon} variant={"plain"}
                                className={this.state.pageId === page.pageId ? "menubar-button-selected" : ""}
                            />
                            <span >{page.tooltip !== 'Enterprise Integration Patterns' ? page.tooltip : 'EIPs'}</span>
                        </FlexItem>
                        {/* </Tooltip> */}
                    </Flex>
                    </Link>
                )
            }
            <FlexItem flex={{ default: "flex_2" }} alignSelf={{ default: "alignSelfCenter" }}>
                <Divider />
            </FlexItem>
            {/* {KaravanApi.authType !== 'public' &&
                <FlexItem alignSelf={{ default: "alignSelfCenter" }}>
                    <Popover
                        aria-label="Current user"
                        position={"right-end"}
                        hideOnOutsideClick={false}
                        isVisible={this.state.showUser === true}
                        shouldClose={tip => this.setState({ showUser: false })}
                        shouldOpen={tip => this.setState({ showUser: true })}
                        headerContent={<div>{KaravanApi.me.userName}</div>}
                        bodyContent={
                            <Flex direction={{ default: "row" }}>
                                {KaravanApi.me.roles && Array.isArray(KaravanApi.me.roles)
                                    && KaravanApi.me.roles
                                        .filter((r: string) => ['administrator', 'developer', 'viewer'].includes(r))
                                        .map((role: string) => <Badge id={role} isRead>{role}</Badge>)}
                            </Flex>
                        }
                    >
                        <UserIcon className="avatar" />
                    </Popover>
                </FlexItem>} */}
        </Flex>)
    }

    toast = (title: string, text: string, variant: 'success' | 'danger' | 'warning' | 'info' | 'default') => {
        const mess = [];
        mess.push(...this.state.alerts, new ToastMessage(title, text, variant));
        this.setState({ alerts: mess })
    }

    onProjectSelect = (project: Project) => {
        this.setState({ pageId: 'project', project: project });
        localStorage.setItem('project', JSON.stringify(project));
    };

    render() {
        return (
            <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage/>} />
                <Route path="/projects" element={
                    <Page className="karavan">
                        <Navbar showMenuModal={this.state.showMenuModal} setShowMenuModal={this.setShowMenuModal} />
                        <Flex direction={{ default: "row" }} style={{ width: "100%", height: "100%" }}
                            alignItems={{ default: "alignItemsStretch" }} spaceItems={{ default: 'spaceItemsNone' }}>
                            {
                                this.state.showMenuModal &&
                                <FlexItem>
                                    {this.pageNav()}
                                </FlexItem>
                            }
                            <ProjectsPage 
                                key={this.state.request}
                                onSelect={this.onProjectSelect}
                                toast={this.toast}
                                config={this.state.config} 
                            />
                        </Flex>
                    </Page>
                } />
                <Route path="/dashboard" element={
                    <Page className="karavan">
                        <Navbar showMenuModal={this.state.showMenuModal} setShowMenuModal={this.setShowMenuModal} />
                        <Flex direction={{ default: "row" }} style={{ width: "100%", height: "100%" }}
                            alignItems={{ default: "alignItemsStretch" }} spaceItems={{ default: 'spaceItemsNone' }}>
                            {
                                this.state.showMenuModal &&
                                <FlexItem>
                                    {this.pageNav()}
                                </FlexItem>
                            }
                            <DashboardPage 
                                key={this.state.request}
                                onSelect={this.onProjectSelect}
                                toast={this.toast}
                                config={this.state.config} 
                            />
                        </Flex>
                    </Page>
                } />
                <Route path="/projects/:projectId" element={
                    <Page className="karavan">
                        <Navbar showMenuModal={this.state.showMenuModal} setShowMenuModal={this.setShowMenuModal} />
                        <Flex direction={{ default: "row" }} style={{ width: "100%", height: "100%" }}
                            alignItems={{ default: "alignItemsStretch" }} spaceItems={{ default: 'spaceItemsNone' }}>
                            {
                                this.state.showMenuModal &&
                                <FlexItem>
                                    {this.pageNav()}
                                </FlexItem>
                            }
                            {this.state.project &&
                            <ProjectPage key="projects" project={this.state.project} config={this.state.config} />
                            }
                        </Flex>
                    </Page>
                } />
                {/* <Route path="/projects/:projectId/:projectName" element={
                    <Page className="karavan">
                        <Navbar showMenuModal={this.state.showMenuModal} setShowMenuModal={this.setShowMenuModal} />
                        <Flex direction={{ default: "row" }} style={{ width: "100%", height: "100%" }}
                            alignItems={{ default: "alignItemsStretch" }} spaceItems={{ default: 'spaceItemsNone' }}>
                            {
                                this.state.showMenuModal &&
                                <FlexItem>
                                    {this.pageNav()}
                                </FlexItem>
                            }
                            {this.state.project &&
                            <ProjectPage key="projects" project={this.state.project} config={this.state.config} />
                            }
                        </Flex>
                    </Page>
                } /> */}
                </Routes>
            </BrowserRouter>
            </div>
        )
    }
}