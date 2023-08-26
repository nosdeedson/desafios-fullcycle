import Cookies  from "js-cookie";
import {decodeJwt} from "jose";

export function makeLoginUrl(): any{
    const nonce = Math.random().toString(36);
    const state = Math.random().toString(36);

    Cookies.set("nonce", nonce);
    Cookies.set("state", state);

    const loginUrlParams = new URLSearchParams({
        client_id: "fullcycle-client",
        redirect_uri: "http://localhost:3000/callback",
        response_type: "token i_token code",
        nonce: nonce,
        state: state
    });

    return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/auth?${loginUrlParams.toString()}`;
}

export function exchangeCodeFortoken(code: string): any{
    const tokenUrlParams = new URLSearchParams({
        client_id: "fullcycle-client",
        grant_typ: "authorization_code",
        code: code,
        redirect_uri: "http://localhost:3000/callback",
        nonce: Cookies.get("nonce") as string
    });

    return fetch(
        "http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/token",
        {
            method: 'POST',
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: tokenUrlParams.toString(),
        }
    ).then(res => res.json())
    .then(res => {
        return login(res.access_token, null, res.refresh_token);
    });
}

export function login(
    accessToken: string,
    idToken: string | null,
    refreshToken?: string,
    state?: string) : any{
    const stateCookie = Cookies.get('state');
    if(state && stateCookie !== state){
        throw new Error("invalid state");
    }
    let decodedAccessToken = null;
    let decodedIdToken = null;
    let decodedRefreshToken = null;
    try {
        decodedAccessToken = decodeJwt(accessToken);
        if(idToken){
            decodedIdToken = decodeJwt(idToken);
        }
        if(refreshToken){
            decodedRefreshToken = decodeJwt(refreshToken);
        }

        if(decodedAccessToken.node !== Cookies.get('nonce')){
            throw new Error('invalid nonce');
        }
        if(decodedIdToken && decodedIdToken.node !== Cookies.get('nonce')){
            throw new Error('invalid nonce');
        }
        if(decodedRefreshToken && decodedRefreshToken.node !== Cookies.get('nonce')){
            throw new Error('invalid nonce');
        }
    } catch (error) {
        console.error(error)
    }

    Cookies.set("access_token", accessToken);
    if(idToken){
        Cookies.set("id_token", idToken);

    }

    if(refreshToken){
        Cookies.set("refresh_token", refreshToken as string);
    }
    return decodedAccessToken;
}

export function getAuth() : any{
    const token = Cookies.get("access_token");
    if(!token){
        return null;
    }

    try {
        return decodeJwt(token)
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function makeLogoutUrl(): any{
    if(!Cookies.get('id_token')){
        return false;
    }
    const logoutParams = new URLSearchParams({
        id_token_hint: Cookies.get('id_token') as string,
        post_logout_redirect_uri: "http://localhost:3000/login"
    });
    Cookies.remove('access_token');
    Cookies.remove('id_token');
    Cookies.remove('refresh_token');
    Cookies.remove('nonce');
    Cookies.remove('stare');
    return `http://localhost:8080/realms/fullcycle-realm/protocol/openid-connect/logout?${logoutParams.toString()}`;
}