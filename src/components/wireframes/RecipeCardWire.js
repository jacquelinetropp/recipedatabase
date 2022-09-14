import React from "react";
import styled from "styled-components";

const Image = styled.div`
  position: relative;
  width: 100%;
  background-color: rgba(51, 51, 51, 0.3);
  height: 100px;
  margin-bottom: 0.3rem;
`;

const Name = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-main);
  padding: 1rem 2rem;
  color: white;
  width: 100%;
`;

const RecipeCardWire = () => {
  return (
    <div>
      <Image />
      <Name />
    </div>
  );
};

export default RecipeCardWire;
