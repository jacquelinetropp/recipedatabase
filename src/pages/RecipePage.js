import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOneRecipe } from "../store/recipes/recipeActions";
import { useParams } from "react-router-dom";
import { convertTemperatures } from "../utils/Conversions";
import Food from "../assets/food.jpg";
import RecipePageWire from "../components/wireframes/RecipePageWire";

import {
  Wrapper,
  Image,
  InnerWrapper,
  Name,
  Main,
  Header,
  IngredientsList,
  InstructionsList,
  DescriptionBox,
  ImageWrapper,
} from "../components/styles/RecipePageStyles";

const RecipePage = ({ recipe, getOneRecipe, loading, measurements }) => {
  const { recipeid } = useParams();
  useEffect(() => {
    getOneRecipe(recipeid);
  }, []);

  let ingredientsContent;
  let instructionsContent = [];
  let list = [];
  const ingredientsList = () => {
    for (let i = 0; i < recipe.size.length; i++) {
      list.push(
        `${recipe.ingredients[i].amount} ${recipe.size[i]} ${recipe.ingredients[i].ingredient}`
      );
    }
  };

  if (loading || !recipe.ingredients) {
    ingredientsContent = <div>Loading...</div>;
  } else {
    ingredientsList();
    ingredientsContent = (
      <Fragment>
        {list.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </Fragment>
    );
    recipe.instructions.map((x) => {
      instructionsContent.push(Object.values(x).toString());
    });
    instructionsContent.map((item) => {
      return <li>{item}</li>;
    });
  }

  const temperature = () => convertTemperatures(measurements, recipe);

  const [imgSrc, setImgSrc] = useState(" ");
  useEffect(() => {
    if (recipe.image) {
      setImgSrc(recipe.image);
    }
  }, [recipe.image]);
  const handleError = () => setImgSrc(Food);

  return !loading || !recipe ? (
    <Wrapper>
      <ImageWrapper>
        <Image>
          <img src={imgSrc} onError={handleError} alt="recipe" />
        </Image>
      </ImageWrapper>

      <InnerWrapper>
        <Name>{recipe.title}</Name>
        <Main>
          <DescriptionBox>
            <p>
              <Header>Cooking Time:</Header>
              {recipe.cookingTime} minutes
            </p>
            <p>
              <Header>Serving Size: </Header>
              {recipe.serving}
            </p>
          </DescriptionBox>
          <hr />
          <Header>Description</Header>
          <p>{recipe.description}</p>
          <hr />
          <Header>Ingredients</Header>
          <IngredientsList>{ingredientsContent}</IngredientsList>
          <hr />
          <Header>Instructions</Header>

          <InstructionsList>
          {recipe.temperature ? (
            <li>Preheat oven to {temperature()}</li>
          ): ""}
            {instructionsContent.map((item) => {
              return <li>{item}</li>;
            })}
          </InstructionsList>
        </Main>
      </InnerWrapper>
    </Wrapper>
  ) : (
    <RecipePageWire />
  );
};

const mapStateToProps = ({ recipe, firebase }) => ({
  recipe: recipe.currentRecipe,
  loading: recipe.getRecipe.loading,
  measurements: firebase.profile.measurements,
});

const mapDispatchToProps = {
  getOneRecipe: getOneRecipe,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
