const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      type: 'button',
    },
    'task-2': {
      id: 'task-2',
      type: 'switch',
    },
    'task-3': {
      id: 'task-3',
      type: 'input',
    },
    'task-4': { id: 'task-4', type: 'upload' },
    'task-5': { id: 'task-5', type: 'checkbox' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Tool Box',
      taskIds: ['task-3', 'task-2', 'task-4', 'task-1', 'task-5'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Create Form',
      taskIds: [],
    },
  },

  columnOrder: ['column-1', 'column-2'],
};

export default initialData;
