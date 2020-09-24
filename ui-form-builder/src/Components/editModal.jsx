import React, { Component } from 'react';
import { Input, Modal } from 'antd';

class EditModal extends Component {
  state = {
    labelVal: null,
  };

  componentDidMount() {
    this.setState({ labelVal: this.props.inputLabel });
  }

  handleOk = (action) => {
    this.props.handleModal(this.state.labelVal, action);
  };

  inputHandler = (e) => {
    this.setState({ labelVal: e.target.value });
  };

  render() {
    const {
      task: { type },
      visible,
    } = this.props;
    const { labelVal } = this.state;
    return (
      <div>
        <Modal
          title={type === 'input' ? 'Input Editor' : 'Button Editor'}
          visible={visible}
          onOk={() => this.handleOk('save')}
          onCancel={() => this.handleOk('cancel')}
        >
          {type === 'input' ? 'Input' : 'Button'} Label:
          <Input
            className="modal-input"
            value={labelVal}
            onChange={this.inputHandler}
          />
        </Modal>
      </div>
    );
  }
}
export default EditModal;
