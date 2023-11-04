import axios from "axios";

// eslint-disable-next-line no-unused-vars
const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
// eslint-disable-next-line no-unused-vars
const DEPLOYED_BACKEND_URL = import.meta.env.VITE_DEPLOYED_BACKEND_URL;

// EDIT THIS URL FOR TESTING
const URL = DEPLOYED_BACKEND_URL;

// OpenAI API Key
const VITE_PALM_APIKEY = import.meta.env.VITE_PALM_APIKEY;

class BackendPaLM {
    generatePrompt = async function (prompt) {
        const result = await axios
            .post(`${URL}/palm/generate_description`, {
                prompt: prompt,
                api_key: VITE_PALM_APIKEY,
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

const BEInstancePaLM = new BackendPaLM();
export default BEInstancePaLM;
