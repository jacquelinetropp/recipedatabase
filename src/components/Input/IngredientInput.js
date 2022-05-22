import { Field } from "formik";
import React, { Fragment } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { connect } from "react-redux";
import Input from "./Input";

const Ingredient = styled.div`
  display: flex;
  margin: 1rem;
`;

const IngredientInput = ({ index, userSetting, auth }) => {
  console.log(userSetting);
  let content;
  if (!userSetting) {
    content = <Fragment>loading...</Fragment>;
  } else if (userSetting === "us") {
    content = (
      <Fragment>
        <option value="cups">cups</option>
        <option value="tbsp">tbsp</option>
        <option value="tsp">tsp</option>
        <option value="serving">serving</option>
      </Fragment>
    );
  } else if (userSetting === "metric") {
    content = (
      <Fragment>
        <option value="oz">oz</option>
        <option value="lbs">lbs</option>
        <option value="ml">ml</option>
        <option value="serving">serving</option>
      </Fragment>
    );
  }
  return (
    <Ingredient>
      <Field
        type="number"
        name={`amount[${index}]`}
        placeholder="Amount"
        component={Input}
      />
      <Field as="select" name={`size[${index}]`}>
        <option value="select">Select</option>
        {content}
      </Field>
      <Field
        type="text"
        name={`ingredients[${index}]`}
        placeholder="Ingredient name..."
        component={Input}
      />
    </Ingredient>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userSetting: firebase.profile.measurements,
  user: firebase.auth.isEmpty,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(IngredientInput);
