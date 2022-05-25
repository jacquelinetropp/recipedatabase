import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Nav from "../../assets/nav.jpg";
import { connect } from "react-redux";
import { ReactComponent as Soup } from "../../assets/soup.svg";
import { ReactComponent as Main } from "../../assets/main.svg";
import { ReactComponent as Appetizer } from "../../assets/bread.svg";
import { ReactComponent as Salad } from "../../assets/salad.svg";
import { ReactComponent as Dessert } from "../../assets/cake.svg";
import { ReactComponent as Beverage } from "../../assets/beverage.svg";
import {signOut} from '../../store/user/userActions';
import Logo from '../../assets/logo.png';

const Wrapper = styled.div``;

const TopNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
`;

const BottomNav = styled.div`
  display: flex;
  justify-content: space-evenly;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7),
      rgba(0, 0, 0, 0.7)
    ),
    url(${Nav});
  background-position: center;
  background-size: cover;
  height: 20rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  font-size: 1.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  height: 50px;
  fill: white;
`;

const HeaderLink = styled(Link)`
  font-size: 2rem;
  color: var(--color-main);
`;

const Button = styled.div`
  font-size: 2rem;
  color: var(--color-main);
  cursor: pointer;
`;

const Image = styled.img`
  height: 60px;
`

const Navbar = ({ authenticated, logout }) => {
  let links;

  if (authenticated) {
    links = <Button onClick={() => logout()}>Logout</Button>;
  } else {
    links = (
      <Fragment>
        <HeaderLink to="/signin">Sign In</HeaderLink>
      </Fragment>
    );
  }
  return (
    <Wrapper>
      <TopNav>
        <a href="/"><Image src={Logo} alt="logo"/></a>
        <div>Search Bar</div>
        {links}
      </TopNav>
      <BottomNav>
        <StyledLink to="/main">
          <Main />
          Main Dishes
        </StyledLink>
        <StyledLink to="/soup">
          <Soup />
          Soup
        </StyledLink>
        <StyledLink to="/appetizer">
          <Appetizer />
          Appetizer
        </StyledLink>
        <StyledLink to="/salad">
          <Salad />
          Salad
        </StyledLink>
        <StyledLink to="/dessert">
          <Dessert />
          Dessert
        </StyledLink>
        <StyledLink to="/beverage">
          <Beverage />
          Beverage
        </StyledLink>
      </BottomNav>
    </Wrapper>
  );
};

const mapStateToProps = ({ firebase }) => ({
  authenticated: firebase.auth.uid,
});

const mapDispatchToProps = {
  logout: signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
