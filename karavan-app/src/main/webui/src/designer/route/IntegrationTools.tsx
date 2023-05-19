/* eslint-disable array-callback-return */
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import KameletsIcon from "@patternfly/react-icons/dist/js/icons/registry-icon";
import EipIcon from "@patternfly/react-icons/dist/js/icons/topology-icon";
import ComponentsIcon from "@patternfly/react-icons/dist/js/icons/module-icon";
import { Component } from "karavan-core/lib/model/ComponentModels";
import { KameletModel } from "karavan-core/lib/model/KameletModels";
import { ElementMeta } from "karavan-core/lib/model/CamelMetadata";
import { SearchInput } from '@patternfly/react-core';
import { KameletCard } from "../customCard/KameletCard";
import { ComponentCard } from "../customCard/ComponentCard";
import { EIPCard } from "../customCard/EIPCard";
import { CamelUi } from "../utils/CamelUi";
import { DslMetaModel } from "../utils/DslMetaModel";
import { FilterByLabels } from "./FilterByLabels";
import './IntegrationTools.css';

interface State {
  component?: Component;
  components: DslMetaModel[],
  kamelet?: KameletModel;
  kamelets: DslMetaModel[],
  element?: ElementMeta;
  elements: DslMetaModel[],
  isKameletClicked: boolean;
  isComponentClicked: boolean;
  isElementClicked: boolean;
  isAllClicked: boolean;
  parentDsl?: string;
  tabIndex: string | number;
  filter: string;
  value: string;
  filterByLabels: any;
}

interface Props {
  onDslSelect: (dsl: DslMetaModel, parentId: string, position?: number | undefined) => void,
  parentId: string,
  position?: number | undefined,
  parentDsl?: string,
  tabIndex?: string | number,
  showSteps: boolean,
}

export class IntegrationTools extends React.Component<Props, State> {

  getDefaultTabIndex = () => {
    const x = CamelUi.getSelectorModelTypes(this.props.parentDsl, this.props.showSteps);
    if (x.length > 0) return x[0][0]
    else return '';
  }

  setFilters = (filterByLabels: any) => {
    this.setState(
      prevFilterByLabels => ({ filterByLabels: filterByLabels })
    );
  }

  public state: State = {
    components: [],
    kamelets: [],
    elements: [],
    isKameletClicked: false,
    isComponentClicked: false,
    isElementClicked: false,
    isAllClicked: true,
    parentDsl: this.props.parentDsl,
    tabIndex: this.props.tabIndex ? this.props.tabIndex : this.getDefaultTabIndex(),
    filter: '',
    value: '',
    filterByLabels: [],
  };

  onChange = (value: string) => {
    this.setState({ value });
  };
  componentDidMount() {
    const labels: [string, number][] = CamelUi.getSelectorModelTypes(this.state.parentDsl, this.props.showSteps);
    labels.forEach((label: [string, number]) => {
      const labelText: string = label[0] ? label[0].toString() : "";
      CamelUi.getSelectorModelsForParentFiltered(this.state.parentDsl, labelText, this.props.showSteps)
        .filter((dsl: DslMetaModel) => CamelUi.checkFilter(dsl, this.state.filter))
        .map((dsl: DslMetaModel, index: number) => {
          if (dsl.navigation === 'kamelet') {
            this.state.kamelets.push(dsl);
          } else if (dsl.navigation === 'component') {
            this.state.components.push(dsl);
          } else {
            this.state.elements.push(dsl);
          }
        });
    });
  }
  handleKameletClick = () => {
    this.setState({ isKameletClicked: true })
    this.setState({ isComponentClicked: false })
    this.setState({ isElementClicked: false })
    this.setState({ isAllClicked: false })
  }
  handleComponentClick = () => {
    this.setState({ isKameletClicked: false })
    this.setState({ isComponentClicked: true })
    this.setState({ isElementClicked: false })
    this.setState({ isAllClicked: false })
  }
  handleElementClick = () => {
    this.setState({ isKameletClicked: false })
    this.setState({ isComponentClicked: false })
    this.setState({ isElementClicked: true })
    this.setState({ isAllClicked: false })
  }
  handleAllClick = () => {
    this.setState({ isKameletClicked: false })
    this.setState({ isComponentClicked: false })
    this.setState({ isElementClicked: false })
    this.setState({ isAllClicked: true })
  }
  getAllLabels = () => {
    const labels: any = [];
    const components = this.state.components;
    const kamelets = this.state.kamelets;
    const elements = this.state.elements;
    components.map((component: DslMetaModel) => {
      if (component.labels) {
        const labelArray = component.labels.split(',');
        labelArray.map((label: string) => {
          if (!labels.includes(label)) {
            labels.push(label);
          }
        })
      }
    })
    kamelets.map((kamelet: DslMetaModel) => {
      if (kamelet.labels) {
        const labelArray = kamelet.labels.split(',');
        labelArray.map((label: string) => {
          if (!labels.includes(label)) {
            labels.push(label);
          }
        })
      }
    })
    elements.map((element: DslMetaModel) => {
      if (element.labels) {
        const labelArray = element.labels.split(',');
        labelArray.map((label: string) => {
          if (!labels.includes(label)) {
            labels.push(label);
          }
        })
      }
    })
    labels.sort();
    return labels;
  }
  render() {
    const components = this.state.components;
    const kamelets = this.state.kamelets;
    const elements = this.state.elements;
    console.log(this.state.filterByLabels);
    return (
      <div className='tools-sec'>
        <div className='tools-tab'>
          <div className={'allIcon ' + (this.state.isAllClicked ? 'isClickedSideBar' : '')} >
            <FontAwesomeIcon icon={faBorderAll}
              color={this.state.isAllClicked ? 'white' : '#06c'}
              onClick={this.handleAllClick}
            />
          </div>
          <div className={'eipIcon ' + (this.state.isElementClicked ? 'isClickedSideBar' : '')}
            onClick={this.handleElementClick}
          >
            <EipIcon color={this.state.isElementClicked ? 'white' : '#06c'} />
          </div>
          <div className={'kameletsIcon ' + (this.state.isKameletClicked ? 'isClickedSideBar' : '')}
            onClick={this.handleKameletClick}
          >
            <KameletsIcon color={this.state.isKameletClicked ? 'white' : '#06c'} />
          </div>
          <div className={'componentsIcon ' + (this.state.isComponentClicked ? 'isClickedSideBar' : '')}
            onClick={this.handleComponentClick}
          >
            <ComponentsIcon color={this.state.isComponentClicked ? 'white' : '#06c'} />
          </div>
        </div>
        <div className='tools-list-section'>
          <div className="tools-search-bar">
            <SearchInput
              placeholder="Search..."
              value={this.state.value}
              onChange={(_event, value) => this.onChange(value)}
              onClear={() => this.onChange('')}
            />
            <FilterByLabels
              labels={this.getAllLabels()}
              setFilters={this.setFilters}
            />
          </div>
          <div className="tools-search-bar">
            <b style={{fontSize:'1.5rem',fontFamily:'Mckinsey-Sans-Light',margin:'auto'}}>{this.state.isComponentClicked ? 'Components' : this.state.isElementClicked ? 'EIPs' : this.state.isKameletClicked ? 'Kameletes' : 'All' }</b>
          </div>
          <div className='tools-list'>
            {
              (this.state.isKameletClicked || this.state.isAllClicked) &&
              kamelets.map((k: DslMetaModel, index: number) => (
                ((this.state.value === '' || (this.state.value !== '' && k.name.toLowerCase().includes(this.state.value.toLowerCase().trim()))) &&
                  ((this.state.filterByLabels.length === 0) || (this.state.filterByLabels.length > 0 && k.labels && k.labels.split(',').some((label: string) => this.state.filterByLabels.includes(label))))) &&
                <KameletCard key={index} kamelet={k} onDslSelect={this.props.onDslSelect} parentId={this.props.parentId} position={this.props.position} />
              ))
            }
            {
              (this.state.isComponentClicked || this.state.isAllClicked) &&
              components.map((c: DslMetaModel, index: number) => (
                (this.state.value === '' || (this.state.value !== '' && c.title.toLowerCase().includes(this.state.value.toLowerCase().trim()))) &&
                ((this.state.filterByLabels.length === 0) || (this.state.filterByLabels.length > 0 && c.labels && c.labels.split(',').some((label: string) => this.state.filterByLabels.includes(label)))) &&
                <ComponentCard key={index} component={c} onDslSelect={this.props.onDslSelect} parentId={this.props.parentId} position={this.props.position} />
              ))
            }
            {
              (this.state.isElementClicked || this.state.isAllClicked) &&
              elements.map((e: DslMetaModel, index: number) => (
                (this.state.value === '' || (this.state.value !== '' && e.name.toLowerCase().includes(this.state.value.toLowerCase().trim()))) &&
                ((this.state.filterByLabels.length === 0) || (this.state.filterByLabels.length > 0 && e.labels && e.labels.split(',').some((label: string) => this.state.filterByLabels.includes(label)))) &&
                <EIPCard key={index} element={e} onDslSelect={this.props.onDslSelect} parentId={this.props.parentId} position={this.props.position} />
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}