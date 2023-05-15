/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { CamelUi } from "../../designer/utils/CamelUi";
import './EIPCard.css';
import { DslMetaModel } from "../utils/DslMetaModel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@patternfly/react-core';
import { EipModal } from '../../eip/EipModal';
import { CamelModelMetadata } from 'karavan-core/lib/model/CamelMetadata';

interface Props {
  onDslSelect: (dsl: DslMetaModel, parentId: string, position?: number | undefined) => void,
  parentId: string,
  position?: number | undefined,
  element: DslMetaModel,
}

interface State {
  element: DslMetaModel,
  isModalOpen: boolean,
}

export class EIPCard extends React.Component<Props, State> {
  public state: State = {
    element: this.props.element,
    isModalOpen: false,
  };

  selectDsl = (evt: React.MouseEvent, dsl: any) => {
    evt.stopPropagation();
    this.props.onDslSelect.call(this, dsl, this.props.parentId, this.props.position);
  }

  render() {
    const component = this.state.element;
    const element = CamelModelMetadata.filter(c => c.name.split(" ").join("").toLowerCase() === component.name.split(" ").join("").toLowerCase())[0];
    return (
      <div className='element-card'>
        <EipModal isOpen={this.state.isModalOpen} element={element} />
        <div className='element-card-info-icon' onClick={(event) => { event.stopPropagation(); this.setState({ isModalOpen: true }) }}>
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