
import FormRegister from "../fragments/auth/formRegister"
import AuthLayout from "../layouts/authLayout"


const Register = () => {
    return (
        <AuthLayout title="Register" type="register">
            <FormRegister/>
        </AuthLayout>
    )
}

export default Register
