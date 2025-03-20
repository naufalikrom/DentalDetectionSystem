
import FormLogin from "../../fragments/auth/formLogin"
import AuthLayout from "../../layouts/authLayout"


const Login = () => {
    return (
        <AuthLayout title="Login" type="login">
            <FormLogin/>
        </AuthLayout>
    )
}

export default Login
