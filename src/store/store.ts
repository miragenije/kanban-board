import { configureStore } from "@reduxjs/toolkit";
import taskSlicesReducer from "./slices/taskSlices";

const store = configureStore({
    reducer: {
        tasks: taskSlicesReducer,
    },
});

export default store;
