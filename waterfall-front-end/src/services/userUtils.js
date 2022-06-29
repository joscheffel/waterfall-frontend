import {push} from "svelte-spa-router";

export async function validateAuthentication(detail) {
    const isCurrentUserAuthenticated = await isAuthenticated();
    if(!isCurrentUserAuthenticated){
        await push("/error/not_authenticated");
    }
    return isCurrentUserAuthenticated;
}

export async function isAuthenticated(){
    const waterfallCredentials = localStorage.waterfall;
    if(waterfallCredentials){
        const savedUser = JSON.parse(waterfallCredentials);
        if(savedUser){
            return true;
        }
    }
    return false;
}

export async function validateAdmin(detail) {
    const isCurrentUserAdmin = await isAdmin();
    if(!isCurrentUserAdmin) {
        await push("/error/no_admin_privileges")
    }
    return isCurrentUserAdmin;
}

export async function isAdmin() {
    const waterfallCredentials = localStorage.waterfall;
    if (waterfallCredentials) {
        const savedUser = JSON.parse(waterfallCredentials);
        if (savedUser.isAdmin) {
            return true;
        }
    }
    return false;
}