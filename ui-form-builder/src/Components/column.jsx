import React, { Component } from 'react';
import Task from './task';
import { Droppable } from 'react-beautiful-dnd';

class Column extends Component {
  handleLabel = (labelVal) => {
    this.props.labelHandler(labelVal);
  };

  render() {
    const {
      column: { title, id },
      tasks,
      column,
    } = this.props;
    return (
      <div className="column-container">
        <div className="title-container">{title}</div>
        <Droppable droppableId={id} type="TASK">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  column={column}
                  labelHandle={this.handleLabel}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default Column;
