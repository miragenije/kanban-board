import { SET_DESCRIPTION, SET_SHOW_DESCRIPTION } from '../constants';

import {setListData} from "../slices/taskSlices";

export const setDescription = (description) => ({
    type: SET_DESCRIPTION,
    payload: description,
});

export const setShowDescription = (show) => ({
    type: SET_SHOW_DESCRIPTION,
    payload: show,
});
export const handleDragEnd = (result, dispatch, listData) => {

    const { source, destination } = result;

    if (!destination) {
        return;
    }

    if (source.droppableId !== destination.droppableId) {
        moveBetweenColumns(source, destination, dispatch, listData);
    } else {
        moveWithinColumn(source, destination, dispatch, listData);
    }
};

const moveBetweenColumns = (source, destination, dispatch, listData) => {
    const [sourceCard] = listData.filter((ele) => ele.id === source.droppableId);
    const [destinationCard] = listData.filter((ele) => ele.id === destination.droppableId);
    const sourceList = [...sourceCard.task];
    const destinationList = [...destinationCard.task];
    const [removedList] = sourceList.splice(source.index, 1);
    destinationList.splice(destination.index, 0, removedList);
    let updatedList = listData.map((ele) => {
        if (ele.id === source.droppableId) {
            return { ...ele, task: sourceList };
        } else if (ele.id === destination.droppableId) {
            return { ...ele, task: destinationList };
        }
        return ele;
    });
    dispatch(setListData(updatedList));
    localStorage.setItem("List", JSON.stringify(updatedList));
};

const moveWithinColumn = (source, destination, dispatch, listData) => {
    const [sourceCard] = listData.filter((ele) => ele.id === source.droppableId);
    const sourceList = [...sourceCard.task];
    const [removedList] = sourceList.splice(source.index, 1);
    sourceList.splice(destination.index, 0, removedList);
    const updatedList = listData.map((ele) => {
        if (ele.id === source.droppableId) {
            return { ...ele, task: sourceList };
        }
        return ele;
    });
    dispatch(setListData(updatedList));
    localStorage.setItem("List", JSON.stringify(updatedList));
};
