import React, { Component } from 'react';
import { Draggable as Drag } from 'react-beautiful-dnd';
import { Button, Input, Switch, Upload, Checkbox } from 'antd';
import { UploadOutlined, EditTwoTone } from '@ant-design/icons';
import EditModal from './editModal';
import Draggable from 'react-draggable';

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

  handleStop = (e) => {
    const { task } = this.props;
    let obj = {
      label: task.label,
      id: task.id,
      type: task.type,
    };
    obj.x = e.x;
    obj.y = e.y;
    this.props.labelHandle(obj);
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
        <Drag draggableId={id} index={index}>
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
                    <Draggable
                      position={{
                        x: task.x ? task.x : 0,
                        y: task.y ? task.y : 0,
                      }}
                      onStop={this.handleStop}
                    >
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
                    </Draggable>
                  ) : (
                    <Button type="primary">Button</Button>
                  )}
                </div>
              ) : type === 'input' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <Draggable
                      position={{
                        x: task.x ? task.x : 0,
                        y: task.y ? task.y : 0,
                      }}
                      onStop={this.handleStop}
                    >
                      <div>
                        <div>
                          {this.props.task.label}
                          <EditTwoTone
                            className="label-button"
                            onClick={this.openInputModal}
                          />
                        </div>
                        <Input style={{ maxWidth: 320 }} />
                      </div>
                    </Draggable>
                  ) : (
                    <div>
                      <div> Input Field</div>
                      <Input style={{ maxWidth: 320 }} />
                    </div>
                  )}
                </div>
              ) : type === 'switch' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <Draggable
                      position={{
                        x: task.x ? task.x : 0,
                        y: task.y ? task.y : 0,
                      }}
                      onStop={this.handleStop}
                    >
                      <div>
                        Switch Button
                        <Switch style={{ marginLeft: 5 }} />
                      </div>
                    </Draggable>
                  ) : (
                    <div>
                      Switch Button
                      <Switch style={{ marginLeft: 5 }} />
                    </div>
                  )}
                </div>
              ) : type === 'upload' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <Draggable
                      position={{
                        x: task.x ? task.x : 0,
                        y: task.y ? task.y : 0,
                      }}
                      onStop={this.handleStop}
                    >
                      <Upload
                        name="logo"
                        action="/upload.do"
                        listType="picture"
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to upload
                        </Button>
                      </Upload>
                    </Draggable>
                  ) : (
                    <Upload name="logo" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                  )}
                </div>
              ) : type === 'checkbox' ? (
                <div>
                  {column.id === 'column-2' ? (
                    <Draggable
                      position={{
                        x: task.x ? task.x : 0,
                        y: task.y ? task.y : 0,
                      }}
                      onStop={this.handleStop}
                    >
                      <Checkbox>Check Box</Checkbox>
                    </Draggable>
                  ) : (
                    <Checkbox>Check Box</Checkbox>
                  )}
                </div>
              ) : (
                type
              )}
            </div>
          )}
        </Drag>
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
