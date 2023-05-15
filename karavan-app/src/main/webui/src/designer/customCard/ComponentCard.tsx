/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { CamelUi} from "../../designer/utils/CamelUi";
import {DslMetaModel} from "../utils/DslMetaModel";
import './ComponentCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@patternfly/react-core';
import { ComponentModal } from '../../components/ComponentModal';
import { ComponentApi } from 'karavan-core/lib/api/ComponentApi';
interface Props {
  onDslSelect: (dsl: DslMetaModel, parentId: string, position?: number | undefined) => void,
  parentId: string,
  position?: number | undefined,
  component: DslMetaModel,
}

interface State {
  component: DslMetaModel,
  isModalOpen: boolean,
}

export class ComponentCard extends React.Component<Props, State> {
  public state: State = {
    component: this.props.component,
    isModalOpen: false,
};

selectDsl = (evt: React.MouseEvent, dsl: any) => {
  evt.stopPropagation();
  this.props.onDslSelect.call(this, dsl, this.props.parentId, this.props.position);
}

  render() {
    const component = this.state.component;
    const componentModalData = ComponentApi.getComponents().filter(c => c.component.name.split("-").join("").toLowerCase() === component.title.toLowerCase().split(" ").join("") )[0];
    console.log('componentModalData: ', component);
    return (
      <div className='element-card' >
      <div className='element-card-info-icon' onClick={(event) => { event.stopPropagation(); this.setState({isModalOpen: true})}}>
        <ComponentModal isOpen={this.state.isModalOpen} component={componentModalData} />
          <Tooltip entryDelay={1000} content={
            <div>
              <div>{component.title} : {component.description}</div>
              <br />
              <div>Click to know more</div>
            </div>

          }>
            <FontAwesomeIcon icon={faInfoCircle} color='#2af' />
            </Tooltip>
          </div>
        <div className='element-card-header' onClick={event => this.selectDsl(event, component)}>
          <div className='element-card-icon'>
            {CamelUi.getIconForDsl(component)}
          </div>
        </div>
        <div className='element-card-title'>
          <Tooltip entryDelay={1000} position='bottom' content={
              <div>{component.title}</div>
          }>
          <a style={{ color: 'black' }}>
            {component.title}
          </a>
          </Tooltip>
        </div>
    </div>
    );
  }
}