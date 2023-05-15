import React, { Component } from 'react';
import { Select, SelectOption, SelectVariant } from '@patternfly/react-core';

interface Option {
  value: string;
  disabled?: boolean;
  description?: string;
}

interface State {
  isOpen: boolean;
  selected: string[];
  resetOnSelect: boolean;
}

interface Props {
  labels: string[];
  setFilters: any;
}

export class FilterByLabels extends Component<Props, State> {

    public state: State = {
      isOpen: false,
      selected: [],
      resetOnSelect: true
    };

    buildOptions = () => {
      const options: Option[] = [];
      this.props.labels.forEach((label) => {
          options.push({value: label});
      });
      return options;
  }

  onToggle = (isOpen: boolean) => {
    this.setState({
      isOpen
    });
  };

  onSelect = (event: any, selection: any) => {
    const { selected } = this.state;
    if (selected.includes(selection)) {
      this.setState(
        prevState => ({ selected: prevState.selected.filter(item => item !== selection) }),
        () => this.props.setFilters(this.state.selected)
      );
    } else {
      this.setState(
        prevState => ({ selected: [...prevState.selected, selection] }),
        () => this.props.setFilters(this.state.selected)
      );
    }
  };

  clearSelection = () => {
    this.setState({
      selected: [],
      isOpen: false
    });
    this.props.setFilters([]);
  };

  toggleResetOnSelect = (checked: boolean) => {
    this.setState({
      resetOnSelect: checked
    });
  };

  render() {
    const { isOpen, selected, resetOnSelect} = this.state;
    const options = this.buildOptions();
    const titleId = 'multi-typeahead-select-id-1';
    return (
      <div>
        <span id={titleId} hidden>
          Filter by labels
        </span>
        <Select
          variant={SelectVariant.typeaheadMulti}
          typeAheadAriaLabel="Filter by labels"
          onToggle={this.onToggle}
          onSelect={this.onSelect}
          onClear={this.clearSelection}
          selections={selected}
          isOpen={isOpen}
          aria-labelledby={titleId}
          placeholderText="Filter by labels"
          shouldResetOnSelect={resetOnSelect}
          style={{
            height: '50vh',
            overflow: 'scroll'
          }}
        >
          {options.map((option, index) => (
            <SelectOption
              isDisabled={option.disabled}
              key={index}
              value={option.value}
            />
          ))}
        </Select>
      </div>
    );
  }
}