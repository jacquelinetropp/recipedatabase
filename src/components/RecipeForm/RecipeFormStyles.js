import styled from "styled-components";

export const Wrapper = styled.div``;

export const ImageDiv = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TempDiv = styled.div`
  display: flex;
  font-size: 2.5rem;
  margin-top: 1rem;
  white-space: nowrap;
  align-items: flex-start;
`;
export const Instructions = styled.div`
  width: 100%;
  text-align: center;
  font-size: 2.5rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

export const Category = styled.div`
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  margin: 1rem 0 2rem 0;
  gap: 12px;
`;