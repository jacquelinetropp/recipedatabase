import { Field } from "formik";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Input from "./Input";

const Ingredient = styled.div`
  display: flex;
  margin: 1rem;
`;

const IngredientInput = ({ index, userSetting, auth }) => {
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
        name={`amount[${index}]`}
        placeholder="Amount"
        component={Input}
        onChange={e => setvalue(e.target.value)}
      />
      <Field as="select" name={`size[${index}]`}>
        <option value="select">Select</option>
        {content}
      </Field>
      <Field
        type="text"
        name={`ingredients[${index}]`}
        placeholder="Ingredient"
        component={Input}
        onChange={e => setNumber(e.target.value)}
      />
    </Ingredient>
  );
};

const mapStateToProps = ({ firebase }) => ({
  userSetting: firebase.profile.measurements,
  user: firebase.auth.isEmpty,
});

export default connect(mapStateToProps)(IngredientInput);
