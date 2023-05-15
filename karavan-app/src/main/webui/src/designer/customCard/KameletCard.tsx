/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {CamelUi} from "../../designer/utils/CamelUi";
import {DslMetaModel} from "../utils/DslMetaModel";
import './KameletCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@patternfly/react-core';
import { KameletApi } from 'karavan-core/lib/api/KameletApi';
import { KameletModal } from '../../kamelets/KameletModal';

interface Props {
  onDslSelect: (dsl: DslMetaModel, parentId: string, position?: number | undefined) => void,
  parentId: string,
  position?: number | undefined,
  kamelet: DslMetaModel
}

interface State {
  kamelet: DslMetaModel,
  isModalOpen: boolean,
}

export class KameletCard extends React.Component<Props, State> {
  public state: State = {
    kamelet: this.props.kamelet,
    isModalOpen: false,
};
selectDsl = (evt: React.MouseEvent, dsl: any) => {
  evt.stopPropagation();
  this.props.onDslSelect.call(this, dsl, this.props.parentId, this.props.position);
}

  render() {
    const kamelet = this.state.kamelet;
    const kameletModalData = KameletApi.getKamelets().filter( k => k.metadata.name.split("-").join("").toLowerCase() === kamelet.name.split("-").join("").toLowerCase())[0]
    return (
      <div className='element-card'>
      <div className='element-card-info-icon' onClick={(event)=>{ event.stopPropagation(); this.setState({isModalOpen: true}) }}>
        <KameletModal isOpen={this.state.isModalOpen} kamelet={kameletModalData} />
          <Tooltip entryDelay={1000} content={
            <div>
              <div>{kamelet.title} : {kamelet.description}</div>
              <br />
              <div>Click to know more</div>
            </div>

          }>
            <FontAwesomeIcon icon={faInfoCircle} color='#2af' />
            </Tooltip>
          </div>
        <div className='element-card-header'  onClick={event => this.selectDsl(event, kamelet)}>
          <div className='element-card-icon'>
            {CamelUi.getIconForDsl(kamelet)}
          </div>
        </div>
        <div className='element-card-title'>
          <Tooltip entryDelay={1000} position='bottom' content={
              <div>{kamelet.title}</div>
          }>
          <a style={{ color: 'black' }}>
            {kamelet.title}
          </a>
          </Tooltip>
        </div>
    </div>
    );
  }
}