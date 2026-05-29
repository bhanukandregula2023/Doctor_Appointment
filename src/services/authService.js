import API from "../api/axiosConfig";

export const registerUser = async (userData) => {

    return await API.post(
        "/auth/register",
        userData
    );
};

export const loginUser = async (loginData) => {

    return await API.post(
        "/auth/login",
        loginData
    );
};