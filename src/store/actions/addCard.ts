import { setListData } from "../slices/taskSlices";
import { Dispatch } from "redux";
import uuid from "react-uuid";

interface Task {
    id: string;
    title: string;
    description: string;
    comments: any[];
}

interface List {
    id: string;
    task: Task[];
}

export const addCard = (
    title: string,
    id: string,
    listData: List[],
    dispatch: Dispatch
): void => {
    let TitleOfList = title.trim();
    if (TitleOfList !== "") {
        let input = [...listData];

        let newTask: Task = {
            id: uuid(),
            title: title,
            description: "",
            comments: [],
        };

        let index = listData.findIndex((ele) => ele.id === id);

        input[index] = {
            ...input[index],
            task: [...input[index].task, newTask],
        };

        dispatch(setListData(input));

        localStorage.setItem("List", JSON.stringify(input));
    }
};
