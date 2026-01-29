import { Router } from "express";
import { adaptRoute } from "c:/Users/Felps/Documents/projetos/secretaria-docs/src/adapters/express-route-adapter"
import CriarUsuarioController from "../controllers/users/criar-usuario";
import { authMiddleware, authorizeRoles } from "../middlewares";
import { validateBody } from "../middlewares/validate-body";
import { createUserSchema } from "../schemas";

export default (router: Router): void => {
  router.post(
    "/users",
    // authMiddleware,
    // authorizeRoles(["Gerente", "Funcionario"]),
    validateBody(createUserSchema),
    adaptRoute(new CriarUsuarioController())
  );
};
