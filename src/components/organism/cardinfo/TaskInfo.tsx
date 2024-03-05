import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
  setListData,
  setDescription as setDescriptionAction,
  setShowDescription,
} from "../../../store/slices/taskSlices";
import { useDispatch, useSelector } from "react-redux";
import DashboardIcon from "@mui/icons-material/Dashboard";
import styled from "styled-components";
import Button from "../../atoms/button/Button";
import {Task, ListData} from "../../../types"

interface TaskInfoProps {
  Cid: string;
  Lid: string;
}

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #323232;
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: lightgray;
  margin-bottom: auto;
  margin-top: 15px;
`;

const Description = styled.h4`
  font-size: 14px;
  color: dimgray;
  margin: 20px 0;
`;

const TitleHolder = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  text-transform: capitalize;
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
  margin-left: auto;
`;

const TaskInfo: React.FC<TaskInfoProps> = ({ Cid, Lid }) => {
  const [currentCardTitle, setCurrentCardTitle] = useState<string>("");
  const [currentTaskTitle, setCurrentTaskTitle] = useState<string>("");
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const dispatch = useDispatch();
  const listData: ListData[] = useSelector((state: any) => state.tasks.listData);
  const description: string = useSelector((state: any) => state.tasks.description);
  const showDescription: boolean = useSelector((state: any) => state.tasks.showDescription);

  useEffect(() => {
    let input: ListData[] = [...listData];
    let index: number = input.findIndex((ele) => ele.id === Lid);

    let currentCard: ListData = { ...input[index] };
    setCurrentCardTitle(currentCard.listName);

    let taskss: List = { ...currentCard };
    let Task: Task[] = [...taskss.task];

    let taskindex: number = Task.findIndex((ele) => ele.id === Cid);

    let currentTask: Task = Task[taskindex];

    if (currentTask) {
      dispatch(setDescriptionAction(currentTask.description));
      setCurrentTaskTitle(currentTask.title);
      setCurrentTask(currentTask);
    }
  }, [showDescription, listData, Lid, Cid, dispatch]);

  function handleDescription() {
    const updatedListData: List[] = listData.map((ele) => {
      if (ele.id === Lid) {
        return {
          ...ele,
          task: ele.task.map((task) =>
              task.id === Cid ? { ...task, description } : task
          ),
        };
      }
      return ele;
    });

    dispatch(setListData(updatedListData));
    localStorage.setItem("List", JSON.stringify(updatedListData));
    dispatch(setShowDescription(false));
  }

  return (
      <>
        <TitleHolder>
          <DashboardIcon />
          <Title>{currentTaskTitle}</Title>
        </TitleHolder>
        <Paragraph>in List {currentCardTitle}</Paragraph>
        {currentTask?.person && (
            <Title>
              Assigned To:
              <Person>{currentTask.person}</Person>
            </Title>
        )}
        <TitleHolder>
          <EditNoteIcon fontSize="large" />
          <Title>Description</Title>
        </TitleHolder>
        {!showDescription ? (
            <div>
              <Description>{currentTask?.description}</Description>
              <Button text="Edit" onClick={() => dispatch(setShowDescription(true))}  />
            </div>
        ) : (
            <>
              <TextField
                  multiline
                  sx={{ width: "100%" }}
                  defaultValue={currentTask?.description}
                  onChange={(e) => {
                    dispatch(setDescriptionAction(e.target.value));
                  }}
              />
              <Button text="Save" onClick={handleDescription} type="add">
                Save
              </Button>
              <Button
                  text="Cancel"
                  onClick={() => {
                    dispatch(setShowDescription(false));
                    dispatch(setDescriptionAction(currentTask?.description || ""));
                  }}
                  type="cancel"
              />
            </>
        )}
      </>
  );
};

export default TaskInfo;
