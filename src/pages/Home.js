import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipes } from "../store/recipes/recipeActions";
import LinkButton from "../components/Button/LinkButton";
import styled from "styled-components";
import RecipeCard from "../components/RecipeCard/RecipeCard";

const Wrapper = styled.div`
  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

const RecipeWrapper = styled.div`
  margin: 2rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
`;

const Home = ({ getRecipes, recipes }) => {
  useEffect(() => {
    getRecipes();
  }, []);
  return (
    <Wrapper>
      <ButtonWrapper>
        <LinkButton contain to="/addrecipe">
          Add Recipe
        </LinkButton>
      </ButtonWrapper>
      <RecipeWrapper>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </RecipeWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ recipe }) => ({
  recipes: recipe.recipes,
});

const mapDispatchToProps = {
  getRecipes: getRecipes,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
