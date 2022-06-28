import {push} from "svelte-spa-router";
import {getContext} from "svelte";

export async function validateAuthentication(detail) {
    const waterfallCredentials = localStorage.waterfall;
    if (waterfallCredentials) {
        const savedUser = JSON.parse(waterfallCredentials);
        if (savedUser.token) {
            return true;
        }
    }
    await push("/error/not_authenticated")
    return false;
}

export async function validateAdmin(detail){
    const waterfallCredentials = localStorage.waterfall;
    if(waterfallCredentials){
        const savedUser = JSON.parse(waterfallCredentials);
        console.log(savedUser);
        if(savedUser.isAdmin){
            return true;
        }
    }
    await push("/error/no_admin_privileges")
    return false;
}