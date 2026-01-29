// import "module-alias/register";
// import { ENV } from "@/config/env";
// import sequelize from "./database";
// import app from "@/config/app";
// import setupDocumentModel from "@/models/documento";

// async function start() {
//   try {
//     // Inicializar modelos
//     setupDocumentModel(sequelize);

//     // Sincronizar banco de dados
//     await sequelize.authenticate();
//     console.log("Conexão com o banco de dados estabelecida com sucesso.");
    
//     // Em desenvolvimento, sincroniza as tabelas
//     if (ENV.NODE_ENV === "development") {
//       await sequelize.sync({ alter: true });
//       console.log("Modelos sincronizados com o banco de dados.");
//     }

//     app.listen(ENV.PORT, () => {
//       console.log(`Servidor rodando na porta ${ENV.PORT}`);
//       if (ENV.SWAGGER_ENABLED) {
//         console.log(`Documentação disponível em http://localhost:${ENV.PORT}/api-docs`);
//       }
//     });
//   } catch (error) {
//     console.error("Erro ao iniciar o servidor:", error);
//     process.exit(1);
//   }
// }

// start();
import { ENV } from "@/config/env";
import { initializeDatabaseAndServer } from "@/config/initializeDatabaseAndServer";
import sequelize from "./database";
// deve ser a primeira coisa a rodar em prod
if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("module-alias/register");
}
async function start() {
  try {
    const app = (await import("@/config/app")).default;

    await initializeDatabaseAndServer(sequelize);

    const server = app.listen(ENV.PORT, () => {
      console.log(`Servidor rodando na porta ${ENV.PORT}`);
      if (ENV.SWAGGER_ENABLED) {
        console.log(`Docs: http://localhost:${ENV.PORT}/api-docs`);
      }
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`Recebido ${signal}. Encerrando...`);
      server.close(async () => {
        try {
          await sequelize.close();
          console.log("Conexão com DB fechada.");
          process.exit(0);
        } catch (e) {
          console.error("Erro ao fechar DB:", e);
          process.exit(1);
        }
      });
      // garante encerramento mesmo se algo travar
      setTimeout(() => process.exit(1), 10_000).unref();
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

    // Boas práticas de runtime
    process.on("unhandledRejection", (reason) => {
      console.error("unhandledRejection:", reason);
    });
    process.on("uncaughtException", (err) => {
      console.error("uncaughtException:", err);
      process.exit(1);
    });
  } catch (err) {
    console.error("Falha ao iniciar servidor:", err);
    process.exit(1);
  }
}

start();
