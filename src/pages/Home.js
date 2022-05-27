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
import RecipeCardWire from "../components/wireframes/RecipeCardWire";

const Home = ({ getRecipes, recipes, authenticated, loading }) => {
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

  //Cards
  let cards;
  if (loading || !recipes) {
    const newCards = [];
    for (let i = 0; i < 10; i++) {
      newCards.push(<RecipeCardWire />);
    }
    cards = newCards;
  } else if (recipes.length === 0) {
    <div>No recipes</div>;
  } else {
    cards = recipes.map((recipe) => {
      return <RecipeCard key={recipe.id} recipe={recipe} />;
    });
  }
  return (
    <Wrapper>
      <ButtonWrapper>{button}</ButtonWrapper>
      <RecipeWrapper>{cards}</RecipeWrapper>
    </Wrapper>
  );
};
const mapStateToProps = ({ recipe, firebase }) => ({
  recipes: recipe.recipes,
  authenticated: firebase.auth.uid,
  categoryRecipes: recipe.categoryRecipes,
  loading: recipe.loading,
});

const mapDispatchToProps = {
  getRecipes: getRecipes,
  getRecipeCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
