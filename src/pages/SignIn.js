import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";

import {signIn} from '../store/user/userActions';
import { MessageWrapper } from "../components/styles";
import Message from "../components/styles/Message";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
// import Heading from "../../components/styles/Headings";

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;
`;

const Main = styled.div`
  width: 70%;
  margin: 15rem auto 0 auto;
  height: 80vh;
  text-align: center;
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

const SignIn = ({ loading, error, login, history }) => {
  //   useEffect(() => {
  //     return () => {
  //       cleanUp();
  //     };
  //   }, [cleanUp]);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={SignInSchema}
      onSubmit={async (values) => {
        await login(values);
        history.push("/");
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Main>
          <h1>Login</h1>
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
        <ButtonWrapper>
            <Button
              loading={loading ? "Logging In..." : null}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Login
            </Button>
            </ButtonWrapper>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
          <Link to="/signup">Create an account</Link>
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
