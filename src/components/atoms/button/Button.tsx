import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
    onClick: () => void;
    style?: React.CSSProperties;
    type?: 'cancel' | 'add'; // Adjust the types based on your specific use case
    text: React.ReactNode;
}

const ButtonStyled = styled.button<{ type: 'cancel' | 'add' }>`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 1rem;
  background: ${({ type }) => (type === 'cancel' ? '#b97673' : '#66a124')};
  color: #fff;
  cursor: pointer;
  border: none;
  outline: none;
  &:hover {
    animation: pulse 1s infinite;
    transition: 0.5s;
  }
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    70% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
    return (
        <ButtonStyled onClick={props.onClick} style={props.style} type={props.type as "cancel" | "add"}>
            {props.text}
        </ButtonStyled>
    );
};

export default Button;
