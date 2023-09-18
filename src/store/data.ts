const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const EDIT_TASK = 'EDIT_TASK';

export const MODULE_NAME = 'data';

export const getTasks = state => state[MODULE_NAME].all_tasks;

const initialState = {
  all_tasks: [],
};

export function tasksReducer(state = initialState, {type, payload}) {
  switch (type) {
    case ADD_TASK:
      return {
        ...state,
        all_tasks: [...state.all_tasks, payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        all_tasks: state.all_tasks.filter(task => task.id !== payload),
      };
    case EDIT_TASK:
      const {id, data} = payload;
      return {
        ...state,
        all_tasks: state.all_tasks.map(task => (task.id == id ? data : task)),
      };
    default:
      return state;
  }
}

export const addTask = payload => ({
  type: ADD_TASK,
  payload,
});

export const deleteTask = payload => ({
  type: DELETE_TASK,
  payload,
});

export const editTask = payload => ({
  type: EDIT_TASK,
  payload,
});
