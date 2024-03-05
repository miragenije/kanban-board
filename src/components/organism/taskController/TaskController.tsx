import React, { useEffect, ChangeEvent } from "react";
import Task from "../task/Task";
import { setListData, setOpenCardInput, setSearchQuery } from "../../../store/slices/taskSlices";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import AddCardIcon from "@mui/icons-material/AddCard";
import { TextField } from "@mui/material";

const TaskContainer = styled.div`
  width: 350px;
  padding: 25px 25px 25px 15px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  display: flex;
  font-size: 18px;
  border-radius: 3px;
  padding: 16px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #575064;
  box-shadow: 0px 3px 9px rgba(0, 0, 0, 0.1);
  border-top: 2px solid transparent;
  text-transform: uppercase;
  background: #fff;
  justify-content: space-between;
`;

const NumOfTask = styled.span`
  color: lightgray;
  display: inline-block;
  margin-left: 10px;
`;

interface TaskControllerProps {}

const TaskController: React.FC<TaskControllerProps> = () => {
  const dispatch = useDispatch();
  const listData = useSelector((state: any) => state.tasks.listData);
  const openCardInputId = useSelector((state: any) => state.tasks.openCardInputId);
  const searchQuery = useSelector((state: any) => state.tasks.searchQuery);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  useEffect(() => {
    console.log("Updated openCardInputId:", openCardInputId);
  }, [openCardInputId]);

  const getColor = (id: string) => {
    if (id === "todo") {
      return '#dd9692';
    } else if (id === "inProgress") {
      return '#25b2fe';
    } else if (id === "done") {
      return '#8ac449';
    }

    return 'black';
  };

  const handleAddButton = (listId: string) => {
    dispatch(setOpenCardInput(listId));
    console.log(openCardInputId, listId);
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("List");
    if (localStorageData) {
      dispatch(setListData(JSON.parse(localStorageData)));
    }
  }, [dispatch]);

  return (
      <div data-testid="task-controller">
        <TextField
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search tasks..."
            variant="outlined"
            size="small"
        />
        <Wrapper>
          {listData.map((ele, index) => (
              <Droppable key={ele.id} index={index} droppableId={ele.id}>
                {(provided) => (
                    <TaskContainer
                        key={ele.id}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                      <Title style={{ borderColor: getColor(ele.id) }}>
                        <div>
                          {ele.listName}
                          <NumOfTask>({ele.task.length})</NumOfTask>
                        </div>
                        <AddCardIcon
                            onClick={() => handleAddButton(ele.id)}
                            style={{ color: getColor(ele.id), cursor: "pointer" }}
                        />
                      </Title>
                      <Task
                          id={ele.id}
                          color={getColor(ele.id)}
                          openCardInput={ele.id === openCardInputId}
                          Lname={ele.listName}
                          task={ele.task}
                          searchQuery={searchQuery}
                      />
                    </TaskContainer>
                )}
              </Droppable>
          ))}
        </Wrapper>
      </div>
  );
};

export default TaskController;
