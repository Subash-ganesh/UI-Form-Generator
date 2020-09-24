import React, { Component } from 'react';
import './App.css';
import initialData from './initial-data';
import Column from './Components/column';
import { DragDropContext } from 'react-beautiful-dnd';
import { Layout, Button, notification } from 'antd';
var uniqid = require('uniqid');

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = initialData;

  componentDidMount() {
    if (localStorage.getItem('saveData')) {
      let existData = localStorage.getItem('taskId');
      let existTaskData = localStorage.getItem('taskList');
      existTaskData = JSON.parse(existTaskData);
      let taskObj = {};
      existTaskData.forEach((item) => {
        taskObj[item.id] = item;
      });
      const start = this.state.columns['column-2'];
      const newColumn = {
        ...start,
        taskIds: JSON.parse(existData),
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
        tasks: { ...taskObj, ...initialData.tasks },
      };
      this.setState(newState);
    }
  }

  clearFormHandler = () => {
    this.setState(initialData);
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];
    if (start === finish && source.droppableId !== 'column-1') {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    if (
      source.droppableId === 'column-1' &&
      destination.droppableId === 'column-2'
    ) {
      const finishTaskIds = Array.from(finish.taskIds);
      let uniqIdGenerator = uniqid('task-');
      let type;
      if (draggableId === 'task-1') {
        type = 'button';
      } else if (draggableId === 'task-3') {
        type = 'input';
      } else if (draggableId === 'task-2') {
        type = 'switch';
      } else if (draggableId === 'task-4') {
        type = 'upload';
      } else if (draggableId === 'task-5') {
        type = 'checkbox';
      }
      finishTaskIds.splice(destination.index, 0, uniqIdGenerator);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newFinish.id]: newFinish,
        },
        tasks: {
          ...this.state.tasks,
          [uniqIdGenerator]: { id: uniqIdGenerator, type, label: type },
        },
      };
      this.setState(newState);
    }
  };

  handleSubmit = () => {
    const { columns, tasks } = this.state;
    localStorage.setItem('saveData', true);
    localStorage.setItem('taskId', JSON.stringify(columns['column-2'].taskIds));
    const task = columns['column-2'].taskIds.map((taskId) => tasks[taskId]);
    localStorage.setItem('taskList', JSON.stringify(task));

    notification['success']({
      message: 'Form Saved',
      description: 'Successfully Form Saved.',
    });
  };

  handleClearData = () => {
    localStorage.clear();
    this.clearFormHandler();
    notification['success']({
      message: 'Form Cleared',
      description: 'Successfully Form Cleared.',
    });
  };

  setLabel = (value) => {
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
      },
      tasks: {
        ...this.state.tasks,
        [value.id]: {
          id: value.id,
          label: value.label,
          type: value.type,
        },
      },
    };
    this.setState(newState);
  };

  render() {
    const { columnOrder, columns } = this.state;
    return (
      <div className="fullHeight">
        <Layout className="layout">
          <Header>
            <div className="header-container">Form Generator</div>
          </Header>
          <Content className="content">
            <div className="site-layout-content">
              <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                  <div style={{ display: 'flex' }}>
                    {columnOrder.map((columnId) => {
                      const column = columns[columnId];
                      const tasks = column.taskIds.map(
                        (taskId) => this.state.tasks[taskId]
                      );
                      return (
                        <Column
                          key={column.id}
                          column={column}
                          tasks={tasks}
                          clearForm={this.clearFormHandler}
                          labelHandler={this.setLabel}
                        />
                      );
                    })}
                  </div>
                  {columns['column-2'].taskIds.length >= 1 && (
                    <div className="button-container">
                      <Button
                        type="primary"
                        className="button-align"
                        onClick={this.handleSubmit}
                      >
                        Save Form
                      </Button>
                      <Button
                        type="danger"
                        className="button-align"
                        onClick={this.handleClearData}
                      >
                        Clear Form
                      </Button>
                    </div>
                  )}
                </div>
              </DragDropContext>
            </div>
          </Content>
          <Footer />
        </Layout>
      </div>
    );
  }
}

export default App;
