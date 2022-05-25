import styled from 'styled-components';
import BackgroundImage from '../../assets/background.jpg'

export const Wrapper = styled.div``;

export const InnerWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  margin-top: -5rem;
  z-index: 3;
  /* position: absolute;
  left: 50%;
  transform: translate(-50%); */
`;
export const Main = styled.div`
  width: 97%;
  float: right;
  box-shadow: 0 0 3rem rgba(0, 0, 0, 0.2);
  padding: 1rem 5rem;
  margin-bottom: 5rem;
`;

export const ImageWrapper = styled.div`
    background-image: url(${BackgroundImage});
    background-size: cover;
`;

export const Image = styled.div`
  width: 80%;
  margin: 0 auto;
  img {
    width: auto;
    height: 40vh;
    margin: 0 auto;
    padding-bottom: 8rem;
    padding-top: 3rem;
    display: block;
    border-radius: 4px;
  }
`;

export const DescriptionBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
`

export const Name = styled.div`
  background-color: var(--color-secondLight);
  padding: 3rem;
  font-size: 5rem;
  color: white;
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.2);
`;

export const Header = styled.h6`
  color: var(--color-mainDark);
  font-size: 1.8rem;
`;

export const InstructionsList = styled.ol`
  padding-left: 3rem;
  font-size: 1.5rem;
`;

export const IngredientsList = styled.ul`
  padding-left: 3rem;
  font-size: 1.5rem;
`