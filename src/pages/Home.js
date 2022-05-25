import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipes, getRecipeCategory } from "../store/recipes/recipeActions";
import LinkButton from "../components/Button/LinkButton";
import {
  Wrapper,
  ButtonWrapper,
  RecipeWrapper,
} from "../components/styles/MainPages";
import RecipeCard from "../components/RecipeCard/RecipeCard";

const Home = ({
  getRecipes,
  recipes,
  authenticated,
}) => {
  useEffect(() => {
    getRecipes();
  }, []);

  let button;

  //Button Logic
  if (authenticated) {
    button = (
      <LinkButton contain to="/addrecipe">
        Add Recipe
      </LinkButton>
    );
  } else {
    button = (
      <LinkButton contain to="/signin">
        Sign In to Create Recipes
      </LinkButton>
    );
  }
  return (
    <Wrapper>
      <ButtonWrapper>{button}</ButtonWrapper>
      <RecipeWrapper>
        {recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
      </RecipeWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ recipe, firebase }) => ({
  recipes: recipe.recipes,
  authenticated: firebase.auth.uid,
  categoryRecipes: recipe.categoryRecipes
});

const mapDispatchToProps = {
  getRecipes: getRecipes,
  getRecipeCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
