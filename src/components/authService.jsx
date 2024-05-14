import axios from "axios";

const API_URL = "http://localhost:8000";

export const registerWithEmailAndPassword = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, {
      username,
      email,
      password,
    });
    console.log(response.data); // assuming the response contains user data
    alert("Account successfully created!");
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    if (error.response && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("An error occurred during registration");
    }
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username: email,
      password: password,
    });
    console.log("You're logged in!", response.data);
    localStorage.setItem("token", response.data.token); // save the token in local storage
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    if (error.response && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    } else {
      throw new Error("An error occurred during login");
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
    localStorage.removeItem("token"); // remove the token from local storage
    window.location.reload(); // reload the page after logout
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("An error occurred during logout");
  }
};
