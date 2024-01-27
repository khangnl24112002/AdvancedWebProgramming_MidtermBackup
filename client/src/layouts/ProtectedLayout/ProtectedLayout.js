import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import Page from "../../components/Page";

const ProtectedLayout = () => {
    const { token } = useAuth();
    const outlet = useOutlet();

    if (!token) {
        return <Navigate to="/auth/sign-in" />;
    }

    return (
        <main className="protectedLayout">
            <Page>{outlet}</Page>
        </main>
    );
};

export default ProtectedLayout;
