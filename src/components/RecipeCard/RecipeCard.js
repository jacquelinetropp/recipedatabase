import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled(Link)`

`;

const Image = styled.img`
    position: relative;
    width: 100%;
`;

const Name = styled.div`
    font-size: 1.4rem;
    background-color: var(--color-main);
    padding: 1rem 2rem;
    color: white;
    width: 100%;
`


const RecipeCard = ({recipe}) => {
    console.log(recipe);
    return (
        <Wrapper to={`/${recipe.id}`}>
            <Image src={recipe.image} alt="recipe image" />
            <Name>{recipe.title}</Name>            
        </Wrapper>
    )
}

export default RecipeCard;
