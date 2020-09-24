import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Input, Switch, Upload, Checkbox } from 'antd';
import { UploadOutlined, EditTwoTone } from '@ant-design/icons';
import EditModal from './editModal';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  openInputModal = () => {
    this.setState({ visible: !this.state.visible });
  };

  modalHandler = (labelVal = null, action = 'cancel') => {
    const { visible } = this.state;
    if (labelVal && action === 'save') {
      let obj = {
        label: labelVal,
        id: this.props.task.id,
        type: this.props.task.type,
      };
      this.props.labelHandle(obj);
    }
    this.setState({ visible: !visible });
  };
  render() {
    const {
      column,
      task: { id, type },
      task,
      index,
    } = this.props;
    const { visible } = this.state;
    return (
      <div>
        <Draggable draggableId={id} index={index}>
          {(provided) => (
            <div
              className="task-container"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {type === 'button' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <div>
                      Button
                      <EditTwoTone
                        className="label-button"
                        onClick={this.openInputModal}
                      />
                      <div>
                        <Button type="primary">{task.label}</Button>
                      </div>
                    </div>
                  ) : (
                    <Button type="primary">Button</Button>
                  )}
                </div>
              ) : type === 'input' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <div>
                      {this.props.task.label}
                      <EditTwoTone
                        className="label-button"
                        onClick={this.openInputModal}
                      />
                    </div>
                  ) : (
                    <div> Input Field</div>
                  )}
                  <Input />
                </div>
              ) : type === 'switch' ? (
                <div>
                  Switch Button
                  <Switch style={{ marginLeft: 5 }} />
                </div>
              ) : type === 'upload' ? (
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              ) : type === 'checkbox' ? (
                <Checkbox>Check Box</Checkbox>
              ) : (
                type
              )}
            </div>
          )}
        </Draggable>
        {visible && (
          <EditModal
            visible={visible}
            handleModal={this.modalHandler}
            task={task}
            inputLabel={task.label}
          />
        )}
      </div>
    );
  }
}
export default Task;
