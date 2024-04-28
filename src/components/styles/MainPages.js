import styled from "styled-components";

export const Wrapper = styled.div`
  margin-top: 2rem;
`;

export const ButtonWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

export const RecipeWrapper = styled.div`
  margin: 2rem;
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

export const NoRecipeText = styled.h4`
  grid-column: 1/-1;
  text-align: center;
  font-size: 3rem;


`