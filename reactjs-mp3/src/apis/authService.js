import axios from "axios";

export const apiLoginSuccess = (id, tokenLogin) =>
    new Promise(async (resolve, reject) => {
        try {
            let response = await axios({
                method: "post",
                url: "http://localhost:5000/api/auth/login-success",
                data: { id, tokenLogin },
            });

            resolve(response);
        } catch (error) {
            reject(error);
        }
    });

export const register = async (data) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/register",
            data
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
