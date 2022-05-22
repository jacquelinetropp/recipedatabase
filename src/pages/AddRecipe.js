import React from "react";
import styled from "styled-components";
import RecipeForm from "../components/RecipeForm/RecipeForm";

const Wrapper = styled.div`
  width: 75%;
  margin: 2rem auto;
`;

const Header = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const AddRecipe = () => {
  return (
    <Wrapper>
      <Header>Add A Recipe</Header>
      <RecipeForm />
    </Wrapper>
  );
};

export default AddRecipe;
