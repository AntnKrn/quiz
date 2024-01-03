import axios from "axios";

export default axios.create({
    baseURL:  'https://reactquiz-b-default-rtdb.europe-west1.firebasedatabase.app/'
})