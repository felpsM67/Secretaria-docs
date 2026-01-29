import { Controller } from "@/protocols/controller";
import { HttpRequest, HttpResponse } from "@/protocols/http";
import { DocumentModel } from "@/models/documento";

export class ListarDocumentosController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId, status } = httpRequest.query;
      
      const where: any = {};
      if (userId) where.userId = userId;
      if (status) where.status = status;

      const documentos = await DocumentModel.findAll({ where });

      return {
        statusCode: 200,
        body: documentos,
      };
    } catch (error: any) {
      console.error("Erro no ListarDocumentosController:", error);
      return {
        statusCode: 500,
        body: { message: error.message || "Erro interno do servidor ao listar documentos" },
      };
    }
  }
}