import React from "react";
import styled from "styled-components";
import TaskInfo from "../organism/cardinfo/TaskInfo";
import Close from "@mui/icons-material/Close";
import { Modal as MuiModal, Backdrop, Fade } from "@mui/material";
import Button from "../atoms/button/Button.tsx";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    task: { id: string;};
    id: string;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 400px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Modal: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen, task, id }) => {
    if (!isModalOpen) return null;
    return (
        <MuiModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={isModalOpen}>
                <ModalOverlay>
                    <ModalContent>
                        <Button
                            text={<Close />}
                            onClick={() => setIsModalOpen(false)}
                            style={{ background: "transparent", color: "#424242", position: "absolute", right: 0 }}
                        />
                        <TaskInfo Cid={task.id} Lid={id} />
                    </ModalContent>
                </ModalOverlay>
            </Fade>
        </MuiModal>
    );
};

export default Modal;
