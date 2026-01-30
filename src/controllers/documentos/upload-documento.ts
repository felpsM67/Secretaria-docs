// import { Controller } from "@/protocols/controller";
// import { HttpRequest, HttpResponse } from "@/protocols/http";
// import { DocumentModel } from "@/models/documento";
// import { ENV } from "@/config/env";

// export class UploadDocumentoController implements Controller {
//   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
//     try {
//       const { userId } = httpRequest.body;
//       const files = httpRequest.files as Express.Multer.File[];

//       if (!userId) {
//         return { statusCode: 400, body: { message: "ID do usuário é obrigatório" } };
//       }

//       if (!files || files.length === 0) {
//         return { statusCode: 400, body: { message: "Nenhum arquivo enviado" } };
//       }

//       // Mapeamento dos campos que precisamos
//       const requiredFields = ["cpf", "rg", "comprovante", "historico"];
//       const fieldToType: { [key: string]: "CPF" | "RG" | "COMPROVANTE_RESIDENCIA" | "HISTORICO_ESCOLAR" } = {
//         cpf: "CPF",
//         rg: "RG",
//         comprovante: "COMPROVANTE_RESIDENCIA",
//         historico: "HISTORICO_ESCOLAR"
//       };

//       const createdDocuments = [];

//       for (const fieldName of requiredFields) {
//         const file = files.find(f => f.fieldname === fieldName);
        
//         if (!file) {
//           return { statusCode: 400, body: { message: `Arquivo obrigatório ausente: ${fieldName}` } };
//         }

//         const documento = await DocumentModel.create({
//           userId,
//           type: fieldToType[fieldName],
//           fileName: file.filename,
//           originalName: file.originalname,
//           mimeType: file.mimetype,
//           size: file.size,
//           path: file.path,
//           status: "PENDENTE",
//           url: `http://localhost:${ENV.PORT}/files/${file.filename}`
//         });
//         createdDocuments.push(documento);
//       }

//       return {
//         statusCode: 201,
//         body: { message: "Documentos enviados com sucesso", documents: createdDocuments },
//       };
//     } catch (error: any) {
//       console.error("Erro no UploadDocumentoController:", error);
//       return { 
//         statusCode: 500, 
//         body: { message: error.message || "Erro interno do servidor ao realizar upload" } 
//       };
//     }
//   }
// }
import { Controller } from "@/protocols/controller";
import { HttpRequest, HttpResponse } from "@/protocols/http";
import { DocumentModel } from "@/models/documento";
import { ENV } from "@/config/env";
import { PdfService } from "@/service/pdf-service";
import path from "path";
import fs from "fs";

export class UploadDocumentoController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest.body;
      const files = httpRequest.files as Express.Multer.File[];

      if (!userId) {
        return { statusCode: 400, body: { message: "ID do usuário é obrigatório" } };
      }

      if (!files || files.length === 0) {
        return { statusCode: 400, body: { message: "Nenhum arquivo enviado" } };
      }

      const requiredFields = ["cpf", "rg", "comprovante", "historico"];
      const fieldToType: { [key: string]: "CPF" | "RG" | "COMPROVANTE_RESIDENCIA" | "HISTORICO_ESCOLAR" } = {
        cpf: "CPF",
        rg: "RG",
        comprovante: "COMPROVANTE_RESIDENCIA",
        historico: "HISTORICO_ESCOLAR"
      };

      const createdDocuments = [];
      const uploadsDir = path.resolve(__dirname, "..", "..", "..", "uploads");

      for (const fieldName of requiredFields) {
        const file = files.find(f => f.fieldname === fieldName);
        
        if (!file) {
          return { statusCode: 400, body: { message: `Arquivo obrigatório ausente: ${fieldName}` } };
        }

        const type = fieldToType[fieldName];
        const timestamp = Date.now();
        
        // Nome "bonitinho": TIPO-USERID-TIMESTAMP.pdf
        const cleanFileName = `${type}-${userId}-${timestamp}.pdf`;
        const finalPath = path.join(uploadsDir, cleanFileName);

        let mimeType = file.mimetype;
        let finalSize = file.size;

        // Se for imagem, converte para PDF
        if (file.mimetype.startsWith('image/')) {
          await PdfService.convertImageToPdf(file.path, finalPath);
          
          // Remove a imagem original após conversão
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          
          mimeType = 'application/pdf';
          finalSize = fs.statSync(finalPath).size;
        } else if (file.mimetype === 'application/pdf') {
          // Se já for PDF, apenas renomeia o arquivo movendo-o
          fs.renameSync(file.path, finalPath);
        } else {
          return { statusCode: 400, body: { message: `Formato de arquivo não suportado para ${fieldName}` } };
        }

        const documento = await DocumentModel.create({
          userId,
          type: type,
          fileName: cleanFileName,
          originalName: file.originalname,
          mimeType: mimeType,
          size: finalSize,
          path: finalPath,
          status: "PENDENTE",
          url: `http://localhost:${ENV.PORT}/files/${cleanFileName}`
        });
        
        createdDocuments.push(documento);
      }

      return {
        statusCode: 201,
        body: { message: "Documentos processados e enviados com sucesso", documents: createdDocuments },
      };
    } catch (error: any) {
      console.error("Erro no UploadDocumentoController:", error);
      return { 
        statusCode: 500, 
        body: { message: error.message || "Erro interno do servidor ao realizar upload" } 
      };
    }
  }
}