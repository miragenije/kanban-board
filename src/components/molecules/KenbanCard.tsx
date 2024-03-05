import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import ListEdit from '../organism/listEdit/ListEdit';

interface KanbanCardProps {
    item: {
        id: string;
        title: string;
        description: string;
        person: string;
    };
    id: string;
    color: string;
    handleToggleModal: (taskId: string) => void;
    handleDoubleClick: (taskId: string) => void;
    index: number;
    taskModals: Record<string, boolean>;
}

const TaskContainer = styled.div`
  cursor: pointer;
`;

const KanbanCardContainer = styled.div`
  min-height: 158px;
  margin-bottom: 20px;
  padding: 16px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.23);
  border-radius: 5px;
  border-left: 10px solid transparent;
`;

const Content = styled.p`
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 14px;
  color: darkgrey;
  margin-bottom: 13px;
  line-height: 18px;
  margin-top: 10px;
`;

const Person = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 100%;
  font-size: 10px;
  font-family: "Lato", sans-serif;
  font-weight: 900;
  color: #ffffff;
  background-color: #c335fb;
`;

const KanbanCard: React.FC<KanbanCardProps> = ({
       item,
       id,
       color,
       handleToggleModal,
       handleDoubleClick,
       index,
       taskModals,
   }) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
            <div
                key={item.id}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <TaskContainer onDoubleClick={() => handleDoubleClick(item.id)}>
                    <KanbanCardContainer style={{ borderColor: color }}>
                        <ListEdit
                            title={item.title}
                            id={item.id}
                            cardId={id}
                            isModalOpen={taskModals[item.id]}
                            setIsModalOpen={() => handleToggleModal(item.id)}
                        />
                        <Content>{item.description}</Content>
                        {item.person && <Person>{item.person}</Person>}
                    </KanbanCardContainer>
                </TaskContainer>
            </div>
        )}
    </Draggable>
);

export default KanbanCard;
