import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  description: string;
  id: string;
  title: string;
  person: string;
}

interface List {
  id: string;
  listName: string;
  status: string;
  task: Task[];
}

interface TaskState {
  listData: List[];
  openCardInputId: string | null;
  description: string;
  showDescription: boolean;
  title: string;
  searchQuery: string;
}

const initialState: TaskState = {
  listData: [
    {
      id: "todo",
      listName: "To Do",
      status: "backlog",
      task: [
        {
          description: "Integrate the React Beautiful DND library to enable users to drag and drop tasks between different lists on the Kanban Board.",
          id: "task1",
          title: "Implement Drag-and-Drop",
          person: "Joe",
        },
        {
          description: "Develop a reusable Task Card component responsible for rendering individual tasks.",
          id: "task2",
          title: "Create Task Component",
          person: "Ann",
        },
        {
          description: "Enhance the application's styling to ensure a seamless user experience on various screen sizes. Implement responsive design principles for a visually appealing layout.",
          id: "task3",
          title: "Optimize Styling",
          person: "Joe",
        },
      ]
    },
    {
      id: "inProgress",
      listName: "In Progress",
      status: "progress",
      task: [
        {
          description: "Extend the Task Card component to include a comments section. Allow users to add, edit, ",
          id: "task4",
          title: "Add Comments Feature",
          person: "Joe",
        },
        {
          description: "Write comprehensive unit tests using Jest for critical components and functionalities to ensure code reliability and maintainability.",
          id: "task5",
          title: "Unit Testing with Jest",
          person: "Joe",
        },
      ]
    },
    {
      id: "done",
      listName: "Done",
      status: "done",
      task: [
        {
          description: "task1",
          id: "task6",
          title: "Work kanban project",
          person: "Joe",
        },
        {
          description: "test",
          id: "task7",
          title: "Write some code",
          person: "Joe",
        },
      ]
    },
  ],
  openCardInputId: null,
  description: '',
  showDescription: false,
  title: '',
  searchQuery: '',
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setListData: (state, action: PayloadAction<List[]>) => {
      state.listData = action.payload;
    },
    setOpenCardInput: (state, action: PayloadAction<string | null>) => {
      state.openCardInputId = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setShowDescription: (state, action: PayloadAction<boolean>) => {
      state.showDescription = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setListData,
  setOpenCardInput,
  setDescription,
  setShowDescription,
  setTitle,
  setSearchQuery,
} = taskSlice.actions;

export default taskSlice.reducer;
