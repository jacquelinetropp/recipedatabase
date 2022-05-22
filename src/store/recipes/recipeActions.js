import * as actions from "./recipeTypes";

export const createRecipe =
  (data, imageUrl) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.CREATE_RECIPE_START });

    try {
      const newRecipe = {
        title: data.title,
        author: data.author,
        ingredients: [...data.ingredients],
        amount: [...data.amount],
        size: [...data.size],
        userId: userId,
        instructions: [...data.instructions],
        temperature: data.temperature,
        degrees: data.degrees,
        image: imageUrl,
        cookingTime: data.cookingTime,
        description: data.description,
        serving: data.serving,
        category: data.category
      };
      await firestore.collection("recipes").add(newRecipe);
      dispatch({ type: actions.CREATE_RECIPE_SUCCESS });
    } catch (e) {
      dispatch({ type: actions.CREATE_RECIPE_FAIL, payload: e });
      console.log(e);
    }
  };

export const getRecipes =
  () =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;

    dispatch({ type: actions.GET_RECIPE_START });
    try {
      const recipeList = await firestore
        .collection("recipes");
      recipeList.onSnapshot((snapshot) => {
        let recipes = [];
        snapshot.docs.forEach((doc) => {
          recipes.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            amount: doc.data().amount,
            size: doc.data().size,
            ingredients: doc.data().ingredients,
            userId: doc.data().userId,
            instructions: doc.data().instructions,
            temperature: doc.data().temperature,
            degrees: doc.data().degrees,
            image: doc.data().image,
          });
        });
        dispatch({ type: actions.GET_RECIPE_SUCCESS, payload: recipes });
      });
    } catch (e) {
      dispatch({ type: actions.GET_RECIPE_FAIL, payload: e });
      console.log(e);
    }
  };

export const getOneRecipe =
  (id) =>
  async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    dispatch({ type: actions.ONE_RECIPE_START });
    try {
      const snapshot = await firestore.collection("recipes").doc(id).get();
      const recipe = await snapshot.data();
      recipe.id = id;
      dispatch({ type: actions.ONE_RECIPE_SUCCESS, payload: recipe });
    } catch (e) {
      dispatch({ type: actions.ONE_RECIPE_FAIL, payload: e });
      console.log(e);
    }
  };
