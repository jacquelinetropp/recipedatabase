import * as actions from "./userTypes";

export const signUp = (data) => async (dispatch, getState, { getFirebase, getFirestore}) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actions.AUTH_START });
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    // const auth = getAuth();
    // createUserWithEmailAndPassword(
    //   auth,
    //   data.email,
    //   data.password
    // ).then((userCredentials) => {
    //   console.log(userCredentials);
    //   const uid = userCredentials.uid;
    //   signInWithEmailAndPassword(auth, data.email, data.password);

    //   onAuthStateChanged(auth, (user) => {
    //     console.log("logged in");
    //     console.log(user.uid);
    //     dispatch({ type: actions.AUTH_SUCCESS, payload: user.uid });
    //   })

      // console.log(data);

      // setDoc(doc(firestore, "users", uid), {
      //   firstName: data.firstName,
      //   lastName: data.lastName,
      // });
    // });

    // const uid = getState().firebase.auth.uid;

    // await setDoc(doc(firestore, "users", uid), {
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    // })

    await firestore.collection("users").doc(res.user.uid).set({
      name: data.name,
      measurements: data.measurements
    });


  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: err.message });
  }
  dispatch({ type: actions.AUTH_END });
};

export const signOut =
  () =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
    } catch (err) {}
  };

export const signIn =
  (data) =>
  async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: actions.AUTH_START });
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      dispatch({ type: actions.AUTH_SUCCESS });

      const measurements = getState().firebase.profile.measurements;
      console.log(measurements);
      dispatch({type: actions.SET_MEASUREMENTS, payload: measurements})
    } catch (err) {
      dispatch({ type: actions.AUTH_FAIL, payload: err.message });
    }
    dispatch({ type: actions.AUTH_END });
  };

  export const editProfile = (data) => async (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const user = firebase.auth().currentUser;
    const { uid: userId, email: userEmail } = getState().firebase.auth;

    dispatch({type: actions.PROFILE_START});
    try {
      if (data.email !== userEmail) {
        await user.updateEmail(data.email);
      }
      await firestore.collection("users").doc(userId).set({
        name: data.name,  
        measurements: data.measurements
      });
  
      if (data.password.length > 0) {
        await user.updatePassword(data.password);
      }
      dispatch({ type: actions.PROFILE_SUCCESS });
    } catch (err) {
  
      dispatch({ type: actions.PROFILE_FAIL, payload: err.message });
    }

  }

  export const setMeasurements = measurements => ((dispatch) => {
    dispatch({type: actions.SET_MEASUREMENTS, payload: measurements});
  })