import { Express, Router } from "express";
import documentoRoutes from "@/routes/documento-routes";
import loginRoutes from "@/routes/login";
import criarUserRoutes from "@/routes/criar-usuario";
import listarUserRoutes from "@/routes/listar-usuario";
import editarUserRoutes from "@/routes/editar-usuario";
import deletarUserRoutes from "@/routes/deletar-usuario";
import refreshTokenRoutes from "@/routes/refresh-token";

export default (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  
  // Rotas de documentos
  documentoRoutes(router);
  
  // Rotas de autenticação
  loginRoutes(router);
  refreshTokenRoutes(router);
  
  // Rotas de usuários
  criarUserRoutes(router);
  listarUserRoutes(router);
  editarUserRoutes(router);
  deletarUserRoutes(router);
};
