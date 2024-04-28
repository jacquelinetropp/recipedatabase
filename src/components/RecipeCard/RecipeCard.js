import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Food from "../../assets/food.jpg";

const Wrapper = styled(Link)`
transition: all .3s cubic-bezier(0.81, 0.19, 0.2, 0.8);
  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  box-shadow: 0 0 2rem rgba(0,0,0,0.3);
`;

const Name = styled.div`
  font-size: 1.6rem;
  background-color: var(--color-main);
  padding: 1rem 2rem;
  width: 100%;
  color: black;
  font-family: 'Salsa', cursive;
  letter-spacing: 2px;
  font-weight: 700;
  text-transform: uppercase;
`;

const RecipeCard = ({ recipe }) => {
  const [imgSrc, setImgSrc] = useState(recipe.image);

  const handleError = () => setImgSrc(Food);

  return (
    <Wrapper to={`/recipe/${recipe.id}`}>
      <Image src={imgSrc} onError={handleError} alt="recipe image" />
      <Name>{recipe.title}</Name>
    </Wrapper>
  );
};

export default RecipeCard;
