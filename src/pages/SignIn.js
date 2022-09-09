import React, {useEffect, useState} from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Link, withRouter, Redirect } from "react-router-dom";
import styled, { ThemeContext } from "styled-components";

import {signIn} from '../store/user/userActions';
import { MessageWrapper } from "../components/styles";
import Message from "../components/styles/Message";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";


const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  padding-bottom: 2rem;
  position: relative;
  margin-top: 1rem;
`;

const Main = styled.div`
  width: 70%;
  margin: 10rem auto 0 auto;
  text-align: center;
`;

const StyledHeader = styled.h1`
    font-size: 2.5rem;
    margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  font-size: 1.5rem;
  color: black;
`;

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("The email is required"),
  password: Yup.string()
    .required("The password is required")
    .min(8, "Too short"),
});

const ButtonWrapper = styled.div`
grid-column: 1/-1;
`

const SignIn = ({ loading, error, login}) => {

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={async (values) => {
        try {
          await login(values);
        } catch (e) {
          console.log(e);
        }       
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Main>
          <StyledHeader>Login</StyledHeader>
          <StyledLink to="/signup">Create an account</StyledLink>
          <StyledForm>
            <Field
              type="email"
              name="email"
              placeholder="Your Email"
              component={Input}
            />

            <Field
              type="password"
              name="password"
              placeholder="Your Password"
              component={Input}
            />
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
        <ButtonWrapper>
            <Button
              loading={loading ? "Logging In..." : null}
              disabled={!isValid || isSubmitting}
              type="submit"
              nopadding
            >
              Login
            </Button>
            </ButtonWrapper>
            
          </StyledForm>
         
        </Main>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ user }) => ({
  loading: user.loading,
  error: user.error,
});

const mapDispatchToProps = {
  login: signIn,
  //   cleanUp: actions.clean,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
