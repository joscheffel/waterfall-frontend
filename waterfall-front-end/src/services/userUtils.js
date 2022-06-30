import {push} from "svelte-spa-router";

export async function validateAuthentication(detail) {
    const isCurrentUserAuthenticated = await isAuthenticated();
    if (!isCurrentUserAuthenticated) {
        await push("/error/not_authenticated");
    }
    return isCurrentUserAuthenticated;
}

export async function isAuthenticated() {
    const user = await getUserFromLocalStorage();
    if (user) {
        return true;
    }
    return false;
}

export async function validateAdmin(detail) {
    const isCurrentUserAdmin = await isAdmin();
    if (!isCurrentUserAdmin) {
        await push("/error/no_admin_privileges")
    }
    return isCurrentUserAdmin;
}

export async function isAdmin() {
    const user = await getUserFromLocalStorage();
    if (user && user.isAdmin) {
        return true;
    }
    return false;
}

export async function isUserItselfOrAdmin(userid){
    const userItself = await isUserItself(userid);
    const admin = await isAdmin();
    return userItself || admin;
}

export async function getUserId(){
    const user = await getUserFromLocalStorage();
    if(user){
        return user.userid;
    }
    return false;
}

async function isUserItself(userid) {
    const user = await getUserFromLocalStorage();
    if (user && user.userid === userid) {
        return true;
    }
    return false;
}

async function getUserFromLocalStorage() {
    const waterfallCredentials = localStorage.waterfall;
    if (waterfallCredentials) {
        const savedUser = JSON.parse(waterfallCredentials);
        return savedUser;
    }
    return null;
}
