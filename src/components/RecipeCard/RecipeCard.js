import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Food from "../../assets/food.jpg";

const Wrapper = styled(Link)``;

const Image = styled.img`
  position: relative;
  width: 100%;
`;

const Name = styled.div`
  font-size: 1.4rem;
  background-color: var(--color-main);
  padding: 1rem 2rem;
  color: white;
  width: 100%;
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
