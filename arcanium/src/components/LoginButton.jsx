import { useAuth0 } from "@auth0/auth0-react";

// button component that will redirect to the login page when clicked
const LoginButton = () => {
    const {loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
        <button onClick={() => loginWithRedirect()}>
            Sign in
        </button>
        )
    )
}

export default LoginButton;
