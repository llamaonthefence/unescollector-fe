import * as usersAPI from "../api/users"; 
import { getToken, removeToken, getUserIdFromToken } from "../util/security";

export async function signUp(userData) {
    console.log("service", userData)
    const token = await usersAPI.signUp(userData);
    return token; 
}

export async function getSignInDetails(email) {
    const signInDetails = await usersAPI.getSignInDetails(email)
    return signInDetails
}

export async function signInUser(userData) {
    const res = await usersAPI.signInUser(userData); 
    return res; 
}

export function getUser() {
    const token = getToken(); 
    return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
}

export async function checkSignIn() {
    const token = getToken();
    const res = await usersAPI.checkSignIn(token)
    return res; 
}

export async function checkPermission() {
    const token = getToken(); 
    const res = await usersAPI.checkPermission(token); 
    return res; 
}

export async function signOutUser() {
    let res; 
    const token = getToken(); 
    if(token) {
        removeToken(); 
    }
    return res; 
}

export async function getUserDetails(userid) {
    const userDetails = await usersAPI.getUserDetails(userid);
    return userDetails; 
}

//handle likes and beenTo
export async function handleLikes(userId, siteId) {
    const user = getUserIdFromToken();

    if (!user) {
        throw new Error("UserId is missing")
    }

    if (!siteId) {
        throw new Error("Site ID is missing")
    }

    return await usersAPI.handleLikes(userId, siteId);
}

export async function handleBeenTo(userId, id) {
    return await usersAPI.handleBeenTo(userId, id); 
}