import React, { useState} from "react";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import { setListData } from '../../../store/slices/taskSlices'
import { useDispatch, useSelector } from 'react-redux'
import {Input} from "@mui/material";
import styled from "styled-components";

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #323232;
`;
const TitleHolder = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListEdit = ({ title, id, cardId }) => {
  const [isInput, setIsInput] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const dispatch = useDispatch();
  const listData = useSelector((state) => state.tasks.listData)

  const handleDelete = () => {
    console.log(id, cardId)
    const updatedList = listData.map(list => {
      console.log(list, cardId )
      if (list.id === cardId) {
        return {
          ...list,
          task: list.task.filter(task => task.id !== id)
        };
      }
      return list;
    });

    dispatch(setListData(updatedList));
    localStorage.setItem("List", JSON.stringify(updatedList));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedList = listData.map(list => {
      if (list.id === cardId) {
        return {
          ...list,
          task: list.task.map(task => (task.id === id ? { ...task, title: newTitle } : task))
        };
      }
      return list;
    });

    dispatch(setListData(updatedList));
    localStorage.setItem("List", JSON.stringify(updatedList));
    setIsInput(!isInput);
  };


  return (
      <div>
        <TitleHolder>
          {isInput ? (
              <form onSubmit={handleEdit}>
                <Input
                    type="text"
                    defaultValue={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
              </form>
          ) : (
              <Title>{newTitle}</Title>
          )}
          <span>
          <EditTwoToneIcon onClick={() => setIsInput(!isInput)} />
          <DeleteIcon className="delete-button" onClick={handleDelete} />
        </span>
        </TitleHolder>
      </div>
  );
};

export default ListEdit;
