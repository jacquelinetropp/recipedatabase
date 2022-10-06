import { Field } from "formik";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Input from "./Input";

const Ingredient = styled.div`
  display: flex;
  margin: 1rem;
`;

const IngredientInput = ({
  index,
  userSetting,
  auth,
  values,
  handleChange,
}) => {
  const [number, setNumber] = useState("");
  const [value, setvalue] = useState("");

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
        <option value="oz">oz</option>
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
        step=".01"
        name={`ingredientsList[${index}].amount`}
        placeholder={`Amount`}
        component={Input}
        value={values.ingredientsList[index].amount}
        handleChange={handleChange}
      />
      <Field as="select" name={`size[${index}]`} value={values.size[index]}>
        <option value="select">Select</option>
        {content}
      </Field>
      <Field
        type="text"
        name={`ingredientsList[${index}].ingredient`}
        placeholder="Ingredient"
        component={Input}
        value={values.ingredientsList[index].ingredient}
        handleChange={handleChange}
      />
    </Ingredient>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userSetting: firebase.profile.measurements,
  user: firebase.auth.isEmpty,
});

export default connect(mapStateToProps)(IngredientInput);
