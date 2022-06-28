import axios from "axios";
import {user} from "../stores.js";

export class WaterfallService {
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        const waterfallCredentials = localStorage.waterfall;
        if (waterfallCredentials) {
            const savedUser = JSON.parse(waterfallCredentials);
            user.set({
                email: savedUser.email,
                token: savedUser.token,
                userid: savedUser.userid,
                isAdmin: savedUser.isAdmin,
            });
            axios.defaults.headers.common.Authorization = "Bearer " + savedUser.token;
        }
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/users/authenticate`, {email, password});
            axios.defaults.headers.common.Authorization = "Bearer" + response.data.token;
            console.log(response);
            if (response.data.success) {
                user.set({
                    email: email,
                    token: response.data.token,
                    userid: response.data.userid,
                    isAdmin: response.data.isAdmin,
                });
                localStorage.waterfall = JSON.stringify({
                    email: email,
                    token: response.data.token,
                    userid: response.data.userid,
                    isAdmin: response.data.isAdmin,
                });
                return true;
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async logout() {
        user.set({
            email: "",
            token: "",
            userid: "",
            isAdmin: false,
        });
        localStorage.removeItem("waterfall");
        axios.defaults.headers.common.Authorization = "";
    }

    async signup(firstName, lastName, email, password) {
        try {
            const userDetails = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            await axios.post(this.baseUrl + "/register", userDetails);
            return true;
        } catch (err) {
            return false;
        }
    }

    async getUserDetails(userid) {
        const user = await axios.get(this.baseUrl + "/api/users/" + userid);
        console.log(user);
        return user;
    }
}