import React, { useState } from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import { StyledForm } from "../styles";
import Input from "../Input/Input";
import IngredientInput from "../Input/IngredientInput";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { createRecipe } from "../../store/recipes/recipeActions";
import firebase from "../../firebase/firebase";
import { withRouter } from "react-router-dom";
import {
  Wrapper,
  ImageDiv,
  Instructions,
  ButtonWrapper,
  TempDiv,
  Category,
  Headers,
} from "./RecipeFormStyles";

const RecipeSchema = Yup.object().shape({
  title: Yup.string().required("The name of the recipe is required"),
  author: Yup.string().required("Please give the author of recipe"),
  description: Yup.string().required(
    "Please write a description of your recipe"
  ),
  cookingTime: Yup.number().required("Please give a time").positive(),
  serving: Yup.number()
    .required("Please write how many people this serves")
    .positive(),
  file: Yup.mixed().required("Please upload an image"),
});

const RecipeForm = ({ createRecipe, loading, userSettings, history }) => {
  const [number, setNumber] = useState(1);
  const [step, setStep] = useState(1);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  let ingredientList = [];

  const handleIngredientRemove = () => {
    setNumber(number - 1);
  };

  const handleInstructionRemove = () => {
    setStep(step - 1);
  };

  //Degree Settings
  const degreeSettings = () => {
    if (userSettings === "us") {
      return <p>F</p>;
    } else {
      return <p>C</p>;
    }
  };

  const handleUpload = async () => {
    return new Promise((resolve, reject) => {
      const storage = firebase.storage();
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              resolve(url);
            });
        }
      );
    });
  };

  return (
    <Formik
      initialValues={{
        title: "",
        author: "",
        ingredientsList: [{ amount: "", ingredient: "" }],
        size: [],
        temperature: "",
        degrees: "f",
        step: [{ instruction: "" }],
        cookingTime: "",
        description: "",
        serving: "",
        category: "main",
      }}
      validationSchema={RecipeSchema}
      onSubmit={async (values) => {
        try {
          const url = await handleUpload();
          createRecipe(values, url);
          history.push('/');
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ isSubmitting, isValid, setFieldValue, values, handleChange }) => (
        <Wrapper>
          <StyledForm>
            <h4>Name of Dish</h4>
            <Field
              type="text"
              name="title"
              placeholder="Recipe Title"
              component={Input}
            />
            <h4>Author of Dish</h4>
            <Field
              type="text"
              name="author"
              placeholder="Your Name"
              component={Input}
            />
            <h4>Description of Dish</h4>
            <Field
              type="text"
              name="description"
              placeholder="Description of recipe"
              component={Input}
            />
            <h4>Cook Time</h4>
            <Field
              type="number"
              name="cookingTime"
              placeholder="How many minutes does this take to cook?"
              component={Input}
            />{" "}
            <h4>Quantity Made</h4>
            <Field
              type="number"
              name="serving"
              placeholder="How much does this make?"
              component={Input}
            />
            <Category>
              <h4>Select a Category</h4>
              <Field as="select" name="category">
                <option value="main">Main Dish</option>
                <option value="soup">Soup</option>
                <option value="appetizer">Appetizer</option>
                <option value="salad">Salad</option>
                <option value="dessert">Dessert</option>
                <option value="beverage">Beverage</option>
              </Field>
            </Category>
            <h4>Recipe Image</h4>
            <ImageDiv>
              <Field
                type="file"
                name="image"
                placeholder="Recipe Image"
                component={Input}
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setImage(e.target.files[0]);
                    setFieldValue("file", e.target.files[0]);
                  }
                }}
              />
            </ImageDiv>
            <h4>Ingredients</h4>
            {Array.from(Array(number)).map((c, index) => {
              return <IngredientInput key={c} index={index} values={values} />;
            })}
            <ButtonWrapper>
              <Button
                recipe
                type="button"
                onClick={() => handleIngredientRemove()}
                contain
              >
                Remove Last Ingredient
              </Button>
              <Button
                color="green"
                contain
                type="button"
                onClick={() => {
                  values.ingredientsList.push({
                    amount: "",
                    ingredient: "",
                  });
                  setNumber(number + 1);
                }}
              >
                Add Ingredient
              </Button>
            </ButtonWrapper>
            <TempDiv>
              <h4>Oven should be set to: </h4>
              <Field
                type="number"
                name="temperature"
                placeholder="temperature"
                component={Input}
              />
              {degreeSettings()}
            </TempDiv>
            <Instructions>
              <h4>Instructions</h4>
              {Array.from(Array(step)).map((c, index) => {
                const stepNumber = index + 1;
                return (
                  <Field
                    type="text"
                    name={`step[${index}].instruction`}
                    placeholder={`Instructions step ${stepNumber}`}
                    component={Input}
                    value={values.step[index].instruction}
                    onChange={handleChange}
                  />
                );
              })}
              <ButtonWrapper>
                <Button
                  recipe
                  type="button"
                  onClick={() => handleInstructionRemove()}
                  contain
                >
                  Remove Last Instruction
                </Button>
                <Button
                  color="green"
                  contain
                  type="button"
                  onClick={() => {
                    values.step.push({
                      instruction: "",
                    });
                    setStep(step + 1);
                  }}
                >
                  Add Step
                </Button>
              </ButtonWrapper>
            </Instructions>
            <Button
              color="green"
              loading={loading ? "Logging In..." : null}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Create Recipe
            </Button>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

const mapStateToProps = ({ recipe, firebase }) => ({
  loading: recipe.loading,
  userSettings: firebase.profile.measurements,
});

const mapDispatchToProps = {
  createRecipe,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeForm)
);
