import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { Formik, Field } from "formik";
import * as Yup from "yup";

import Input from "../components/Input/Input";
import Message from "../components/styles/Message";
import Button from "../components/Button/Button";
import { MessageWrapper, StyledForm, FormWrapper } from "../components/styles";

import { signUp } from "../store/user/userActions";

const TextWrapper = styled.div`
  margin-bottom: 2rem;
`;

const MeasurementsWrapper = styled.div`
  display: grid;
  grid-gap: 1rem;
  font-size: 2rem;
  text-align: center;
`;

const Schema = Yup.object().shape({
  name: Yup.string()
    .required("Your name is required.")
    .min(3, "Too short.")
    .max(25, "Too long."),
  email: Yup.string()
    .email("Invalid email.")
    .required("The email is required."),
  password: Yup.string()
    .required("The passoword is required.")
    .min(8, "Too short"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], `Password doesn't match`)
    .required("You need to confirm your password."),
});

const EditPage = ({ signUp, loading, error, firebase }) => {
    console.log(firebase.profile.name);
  return (
    <Formik
      initialValues={{
        name: firebase.profile.name,
        email: firebase.auth.email ? firebase.auth.email : "",
        password: "",
        confirmPassword: "",
        measurements: firebase.profile.measurements ? firebase.profile.measurements :"us",
      }}
      validationSchema={Schema}
      onSubmit={async (values) => {
        await signUp(values);
      }}
    >
      {({ isSubmitting, isValid }) => (
        <FormWrapper>
          <TextWrapper>
            <h1>{firebase.profile ? "Edit Profile" : "Sign Up"}</h1>
          </TextWrapper>

          <StyledForm>
            <Field
              type="text"
              name="name"
              placeholder="Your name..."
              component={Input}
            />
            <Field
              type="email"
              name="email"
              placeholder="Your email..."
              component={Input}
            />
            <Field
              type="password"
              name="password"
              placeholder="Your password..."
              component={Input}
            />
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Re-type your password..."
              component={Input}
            />
            <MeasurementsWrapper>
              <h6>Measurement preference </h6>
              <Field as="select" name="measurements">
                <option value="us">US</option>
                <option value="metric">Metric</option>
              </Field>
            </MeasurementsWrapper>
            <Button
              disabled={!isValid || isSubmitting}
              loading={loading ? "Signing Up" : null}
              type="submit"
            >
              Sign up
            </Button>
            <MessageWrapper>
              <Message error show={error}>
                {error}
              </Message>
            </MessageWrapper>
          </StyledForm>
        </FormWrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ user, firebase }) => ({
  loading: user.loading,
  error: user.error,
  firebase
});

const mapDispatchToProps = {
  signUp: signUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
