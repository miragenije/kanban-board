import React from 'react';
import TaskController from '../../organism/taskController/TaskController';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { handleDragEnd } from '../../../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const BoardContainer = styled.div`
  background: #f7f8f9;
  height: 100vh;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board: React.FC = () => {
    const dispatch = useDispatch();
    const listData = useSelector((state: any) => state.tasks.listData);

    const onDragEnd = (result: DropResult) => {
        handleDragEnd(result, dispatch, listData);
    };

    return (
        <BoardContainer data-testid="board-container" >
            <DragDropContext onDragEnd={onDragEnd}>
                <TaskController />
            </DragDropContext>
        </BoardContainer>
    );
};

export default Board;
