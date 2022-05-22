import React from "react";
import styled from "styled-components";

const P = styled.p`
  font-weight: 700;
  font-size: 1.2rem;
  background-color: rgba(255, 255, 255, .4);
  padding: 1rem;
  border-radius: 10px; 
  color: ${({ error, success }) => {
    if (error) return "var(--color-errorRed)";
    if (success) return "green";
    else return "var(--color-main)";
  }};
  opacity: ${({ show }) => (show ? "1" : "0")};
  transform: translateY(${({ show }) => (show ? "30px" : "0px")});
  text-align: center;
  transition: all 0.2s;
`;

const Message = ({ children, error, success, show }) => {
  return (
    <P error={error} success={success} show={show}>
      {children}
    </P>
  );
};

export default Message;