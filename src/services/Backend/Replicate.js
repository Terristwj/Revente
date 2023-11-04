import axios from "axios";

// eslint-disable-next-line no-unused-vars
const LOCAL_BACKEND_URL = import.meta.env.VITE_LOCAL_BACKEND_URL;
// eslint-disable-next-line no-unused-vars
const DEPLOYED_BACKEND_URL = import.meta.env.VITE_DEPLOYED_BACKEND_URL;

// EDIT THIS URL FOR TESTING
const URL = DEPLOYED_BACKEND_URL;

// OpenAI API Key
const REPLICATE_API_KEY = import.meta.env.VITE_REPLICATE_APIKEY;

class BackendReplicate {
    identifyProduct = async function (fileURL) {
        const result = await axios
            .post(`${URL}/replicate/generate_information_v2`, {
                file: fileURL,
                api_key: REPLICATE_API_KEY,
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

const BEInstanceReplicate = new BackendReplicate();
export default BEInstanceReplicate;
