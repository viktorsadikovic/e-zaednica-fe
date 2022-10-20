import { Navigate, Route, Routes } from "react-router-dom";
import ForgotPassword from "./features/Auth/ForgotPassword/ForgotPassword";
import Login from "./features/Auth/Login/Login";
import Register from "./features/Auth/Register/Register";
import SetNewPassword from "./features/Auth/SetNewPassword/SetNewPassword";
import VerificationCode from "./features/Auth/VerificationCode/VerificationCode";
import routes from "./routes";

const UnauthenticatedApp = () => {
  return (
    <Routes>
      <Route path={routes.root.path} element={<Login />} />
      <Route path={routes.signin.path} exact element={<Login />} />
      <Route path={routes.signup.path} element={<Register />} />
      <Route
        path={routes.forgotPassword.path}
        exact
        element={<ForgotPassword />}
      />
      <Route
        path={routes.verificationCode.path}
        element={<VerificationCode />}
      />
      <Route path={routes.setNewPassword.path} exact element={<SetNewPassword />} />
      <Route
        path={routes.all.path}
        element={<Navigate to={routes.root.path} replace />}
      />
    </Routes>
  );
};

export default UnauthenticatedApp;
