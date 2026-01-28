import { LoginController } from "../controllers/login/login-controller-factories";

export const LoginControllerFactory = () => {
  return new LoginController();
};
