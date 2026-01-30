import { Controller, HttpRequest, HttpResponse } from "@/protocols";
import { badRequest, serverError, ok } from "@/helpers/http-helper";
// Importe seu repositório ou caso de uso aqui

export class EditarDocumento implements Controller {
  async handle(httpRequest: HttpRequest ): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const { status } = httpRequest.body;

      if (!status ) {
        return badRequest(new Error("Status é obrigatório"));
      }

      // AQUI você chama o seu repositório para atualizar no banco
      // Exemplo: await this.documentoRepository.updateStatus(id, status);

      return ok({ message: "Status atualizado com sucesso", id, status });
    } catch (error) {
      return serverError(error);
    }
  }
}
