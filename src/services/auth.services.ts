import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

export const Login = async ({ data, callback }: {
    data: any;
    callback: (success: boolean, tokenOrError: string | Error) => void;
}) => {
    try {
        const res = await axios.post('http://localhost:8000/api/v1/auth/login', data, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        callback(true, res.data.access_token);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            callback(false, err.response.data.detail || "Unknown error");
        } else {
            callback(false, err as Error);
        }
    }
};

export const Protected = async (token: string) => {
    try {
        const res = await axios.get('http://localhost:8000/api/v1/auth/protected', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (err) {
        return err
    }
}

interface DecodedToken extends JwtPayload {
    id: number;
    username: string;
    email: string;
    password: string;
    is_verified: boolean;
}

export const GetAccountverified = (token: string) => {
    const decoded = jwtDecode<DecodedToken>(token);
    return {
        allData: decoded
    };
};

export const EmailOTP = async ({ otp, callback }: {
    otp: string;
    callback: (success: boolean, tokenOrError: string | Error) => void;
}) => {
    try {
        const res = await axios.post(
            'http://localhost:8000/api/v1/auth/email-verification',
            { code: otp }, // Mengubah 'otp' menjadi 'code'
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        callback(true, res.data.message);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            callback(false, err.response.data.detail || "Unknown error");
        } else {
            callback(false, err as Error);
        }
    }
};

export const ResendOTP = async ({ email, callback }: {
    email: string,
    callback: (success: boolean, tokenOrError: string | Error) => void;
}) => {
    try {
        const res = await axios.post(
            `http://localhost:8000/api/v1/auth/resend_otp?email=${encodeURIComponent(email)}`, { email }
        );
        callback(true, res.data.message);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            callback(false, err.response.data.detail || "Unknown error");
        } else {
            callback(false, err as Error);
        }
    }
}

export const Register = async ({ email, username, password, callback }: {
    email: string;
    username: string;
    password: string;
    callback: (success: boolean, tokenOrError: string | Error) => void
}) => {
    try {
        const res = await axios.post('http://localhost:8000/api/v1/auth/signup',
            {
                email : email,
                username : username,
                password : password
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        callback(true, res.data);
    } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
            callback(false, err.response.data.detail || "Unknown error");
        } else {
            callback(false, err as Error);
        }
    }
}