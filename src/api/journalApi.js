

import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-tester-3b3f8-default-rtdb.firebaseio.com'
})


export default journalApi