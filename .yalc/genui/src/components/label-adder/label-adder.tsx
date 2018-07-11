import * as React from 'react';
import styled from 'styled-components';

import Icon from '../icon';

const Container = styled.div`
  border: #ccc 1px solid;
  padding: 5px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  border: none;
  outline: none;
`;

const LabelList = styled.div``;

interface LabelProps {
  text: string;
  onRemove: () => any;
  className?: string;
}

const Label: React.StatelessComponent<LabelProps> = ({
  text,
  onRemove,
  className,
}) => (
  <div className={className || ''}>
    <span>{text}</span>
    <a onClick={onRemove}>
      <Icon name="fas fa-times" />
    </a>
  </div>
);

const StyledLabel = styled(Label)`
  font-size: 0.8rem;
  display: inline-block;
  background: #eee;
  padding: 6px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 3px;

  span {
    margin-right: 10px;
  }

  a {
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

export interface LabelAdderProps {
  onChange?: (labels: string[]) => any;
  labels: string[];
  placeholder?: string;
}

class LabelAdder extends React.Component<LabelAdderProps> {
  private inputElem: HTMLInputElement;

  /**
   * Event handler for adding a label
   * Dispatches the onChange prop function with the updated label list
   */
  handleAdd = (e: any) => {
    e.preventDefault();

    const label = this.inputElem.value;

    this.props.onChange && this.props.onChange(this.props.labels.concat(label));

    this.inputElem.value = '';
  };

  /**
   * Event handler for removing a label
   */
  handleRemove = (index: number) => {
    const newLabels = [
      ...this.props.labels.slice(0, index),
      ...this.props.labels.slice(index + 1),
    ];

    this.props.onChange && this.props.onChange(newLabels);
  };

  render() {
    return (
      <Container>
        <LabelList>
          {this.props.labels.map((label, key) => (
            <StyledLabel
              text={label}
              key={key}
              onRemove={() => this.handleRemove(key)}
            />
          ))}
        </LabelList>

        <form onSubmit={this.handleAdd}>
          <Input
            innerRef={input => {
              this.inputElem = input;
            }}
            placeholder={this.props.placeholder || 'Add new label here...'}
          />
        </form>
      </Container>
    );
  }
}

export default LabelAdder;
