import {jwtDecode} from "jwt-decode"
 function VerifyRole(token: string | any) {
    const decoded = jwtDecode<any>(token);
    return decoded
}

export default VerifyRole;