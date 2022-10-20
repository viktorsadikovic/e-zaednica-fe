import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import AuthenticatedApp from "./AuthenticatedApp";
import NotFound from "./features/NotFound";
import { useAuth } from "./redux/auth";
import UnauthenticatedApp from "./UnauthenticatedApp";

const App = () => {
  const [{ isAuthenticated }] = useAuth();

  return (
    <ErrorBoundary fallback={<NotFound />}>
      {isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ErrorBoundary>
  );
};

export default App;
