import { useAuth0 } from "@auth0/auth0-react";

// Button component that will log the user out when clicked
const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();

    const handleLogout = () => {
        const returnTo = process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BASE_URL
            : window.location.origin;

        logout({ returnTo });
    };

    return (
        isAuthenticated && (
            <button onClick={handleLogout}>
                Logout
            </button>
        )
    );
};

export default LogoutButton;
