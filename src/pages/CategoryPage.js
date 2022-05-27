import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRecipeCategory } from "../store/recipes/recipeActions";
import LinkButton from "../components/Button/LinkButton";
import {
  Wrapper,
  ButtonWrapper,
  RecipeWrapper,
  NoRecipeText,
} from "../components/styles/MainPages";
import RecipeCard from "../components/RecipeCard/RecipeCard";

const CategoryPage = ({
  recipes,
  authenticated,
  getRecipeCategory,
  loading,
}) => {
  const category = window.location.pathname.slice(1).toString();
  useEffect(() => {
    getRecipeCategory(category);
  }, []);

  let button;
  let display;

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

  if (!recipes || loading) {
    display = <div>Loading...</div>;
  } else if (recipes.length === 0) {
    display = (
      <NoRecipeText>
        You are the first one here! Make a contribution and create a recipe!
      </NoRecipeText>
    );
  } else {
    display = recipes.map((recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });
  }
  return (
    <Wrapper>
      <ButtonWrapper>{button}</ButtonWrapper>
      <RecipeWrapper>{display}</RecipeWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ recipe, firebase }) => ({
  recipes: recipe.categoryRecipe,
  authenticated: firebase.auth.uid,
  loading: recipe.getRecipe.loading,
});

const mapDispatchToProps = {
  getRecipeCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
