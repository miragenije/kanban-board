import React, { useState, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";
import Modal from "../../molecules/Modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addCard } from "../../../store/actions/addCard";
import { setOpenCardInput } from "../../../store/slices/taskSlices";
import Button from "../../atoms/button/Button";
import KenbanCard from "../../molecules/KenbanCard";
import {Task as TaskProps} from "../../../types"

const TaskContainer = styled.div`
  cursor: pointer;
  .delete-button {
    z-index: 999;
    display: none;
  }
  &:hover {
    .delete-button {
      display: inline-block;
    }
  }
`;

const ButtonHolder = styled.div`
  display: flex;
  margin-top: 15px;
  justify-content: flex-end;
`;

const Task: React.FC<TaskProps> = ({ id, task, color, searchQuery }) => {
  const [title, setTitle] = useState("");
  const [taskModals, setTaskModals] = useState<{ [taskId: string]: boolean }>({});
  const dispatch = useDispatch();
  const listData = useSelector((state: any) => state.tasks.listData);
  const openCardInputId = useSelector((state: any) => state.tasks.openCardInputId);
  const filteredTasks = task.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleModal = (taskId: string) => {
    setTaskModals((prevModals) => ({ ...prevModals, [taskId]: !prevModals[taskId] }));
  };

  const handleSubmit = () => {
    addCard(title, id, listData, dispatch);
    dispatch(setOpenCardInput(null));
    setTitle("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    dispatch(setOpenCardInput(null));
    setTitle("");
  };

  const handleDoubleClick = (taskId: string) => {
    if (!openCardInputId) {
      handleToggleModal(taskId);
    }
  };

  return (
      <div>
        {filteredTasks && filteredTasks.length > 0
            ? filteredTasks.map((item, index) => (
                <TaskContainer key={item.id}>
                  <KenbanCard
                      index={index}
                      item={item}
                      id={id}
                      color={color}
                      handleToggleModal={handleToggleModal}
                      handleDoubleClick={handleDoubleClick}
                      taskModals={taskModals}
                  />
                  <Modal
                      isModalOpen={taskModals[item.id]}
                      setIsModalOpen={() => handleToggleModal(item.id)}
                      task={item}
                      id={id}
                  />
                </TaskContainer>
            ))
            : null}
        {(openCardInputId && openCardInputId === id) && (
            <div>
              <div>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="Enter card name"
                    multiline
                    value={title}
                    onChange={handleChange}
                    rows={2}
                    sx={{ width: "100%" }}
                />
              </div>
              <ButtonHolder>
                <Button text="Add ticket" onClick={handleSubmit} type="add" />
                <Button text="Cancel" onClick={handleCancel} type="cancel" />
              </ButtonHolder>
            </div>
        )}
      </div>
  );
};

export default Task;
