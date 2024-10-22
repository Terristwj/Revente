import axios from "axios";

// eslint-disable-next-line no-unused-vars
const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
// eslint-disable-next-line no-unused-vars
const DEPLOYED_BACKEND_URL = import.meta.env.VITE_DEPLOYED_BACKEND_URL;

// EDIT THIS URL FOR TESTING
const URL = DEPLOYED_BACKEND_URL;

// OpenAI API Key
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_APIKEY;

class BackendOpenAI {
    generateItemInformation = async function (prompt) {
        const result = await axios
            .post(`${URL}/openai/generate_information`, {
                prompt: prompt,
                api_key: OPENAI_API_KEY,
            })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

        return result;
    };

    generateMarketingDescription = async function (prompt) {
        const result = await axios
            .post(`${URL}/openai/generate_description`, {
                prompt: prompt,
                api_key: OPENAI_API_KEY,
            })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

        return result;
    };

    generateDataAnalysis = async function (prompt) {
        const result = await axios
            .post(`${URL}/openai/analyze_data`, {
                prompt: prompt,
                api_key: OPENAI_API_KEY,
            })
            .then((res) => {
                // console.log(res);
                return res;
            })
            .catch((error) => {
                console.log(error);
                return error;
            });

        return result;
    };
}

const BEInstanceOpenAI = new BackendOpenAI();
export default BEInstanceOpenAI;
