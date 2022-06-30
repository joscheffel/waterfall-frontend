import axios from "axios";
import {user} from "../stores.js";
import {getUserId} from "./userUtils.js";

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

    async getUserAnalyticsList() {
        try {
            const userAnalyticsList = await axios.get(this.baseUrl + "/admin/api/analytics");
            return Array.from(userAnalyticsList.data);
        } catch (err) {
            console.log(err);
        }
        return [];
    }

    async getUserAnalytics(userid) {
        const userAnalytics = await axios.get(this.baseUrl + "/admin/api/analytics/" + userid);
        return userAnalytics.data;
    }

    async getUserDetails(userid) {
        const user = await axios.get(this.baseUrl + "/api/users/" + userid);
        return user.data;
    }

    async updateUser(user) {
        try {
            const u = await axios.put(this.baseUrl + "/api/users/" + user._id, user);
            return u;
        } catch (err) {
            console.log(err);
            if(err.message) {
                return {error: err.name, message: err.message};
            }else{
                return {error: err.response.data.error, message: err.response.data.message};
            }
        }
    }

    async getWaterfallDetails(waterfallId) {
        const waterfall = await axios.get(this.baseUrl + "/api/waterfalls/" + waterfallId);
        return waterfall.data;
    }

    async getWaterfalls() {
        try {
            const waterfalls = await axios.get(this.baseUrl + "/api/waterfalls");
            return Array.from(waterfalls.data);
        } catch (err) {
            console.log(err);
        }
        return [];
    }

    async createWaterfall(name, description, continent, size, lat, long) {
        const userid = await getUserId();
        const createWaterfall = {
            name: name,
            description: description,
            categories: {
                continent: continent,
                size: size,
            },
            location: {
                lat: lat,
                long: long,
            },
            userid: userid,
        }
        try {
            const waterfall = await axios.post(this.baseUrl + "/api/waterfalls", createWaterfall);
            return waterfall.data;
        } catch (err) {
            return {error: err.response.data.error, message: err.response.data.message};
        }
    }

    async updateWaterfall(id, userid, v, name, description, continent, size, lat, long) {
        const createWaterfall = {
            _id: id,
            __v: v,
            name: name,
            description: description,
            categories: {
                continent: continent,
                size: size,
            },
            location: {
                lat: lat,
                long: long,
            },
            userid: userid,
        }
        try {
            const waterfall = await axios.put(this.baseUrl + "/api/waterfalls/" + id, createWaterfall);
            return waterfall.data;
        } catch (err) {
            return {error: err.response.data.error, message: err.response.data.message};
        }
    }
}