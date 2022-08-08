import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

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
} from "../../components/styles/RecipePageStyles";

const PhotoWire = styled.div`
    height: 200px;
    width: 200px;
    background-color: rgba(0,0,0,0.3);
    margin: 0 auto;
    padding-top: 10rem;

`;

const RecipePageWire = () => {

  return (
    <Wrapper>
      <ImageWrapper>
        <Image>
          <PhotoWire />
        </Image>
      </ImageWrapper>

      <InnerWrapper>
        <Name>...</Name>
        <Main>
          <DescriptionBox>
            <p>Cooking time: ... minutes</p>
            <p>Serving Size: ...</p>
          </DescriptionBox>
          <hr />
          <Header>Description</Header>
          <p>...</p>
          <hr />
          <Header>Ingredients</Header>
          <IngredientsList>...</IngredientsList>
          <hr />
          <Header>Instructions</Header>

          <InstructionsList>
            <li>
              Preheat oven to ...
            </li>
          </InstructionsList>
        </Main>
      </InnerWrapper>
    </Wrapper>
  );
};

export default RecipePageWire;
