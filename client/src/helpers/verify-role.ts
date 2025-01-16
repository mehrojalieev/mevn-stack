import {jwtDecode, JwtPayload} from "jwt-decode"

 function VerifyRole(token: string | null): JwtPayload | null {
    if(!token ){
        return null;
    }
    if(typeof token !== "string" || token.split(".").length !== 3){
        throw new Error("Invalid JWT format");
    }
    const decoded = jwtDecode<JwtPayload>(token );
    return decoded;                                                                                      
}

export default VerifyRole;