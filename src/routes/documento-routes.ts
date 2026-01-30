import { Router } from "express";
import { adaptRoute } from "@/adapters/express-route-adapter";
import { UploadDocumentoController } from "@/controllers/documentos/upload-documento";
import { ListarDocumentosController } from "@/controllers/documentos/listar-documentos";
import { upload } from "@/config/multer";
import { EditarDocumento } from "@/controllers/documentos/editar-documento";


export default (router: Router): void => {
  router.post(
    "/documentos/upload", 
    upload.any(), 
    adaptRoute(new UploadDocumentoController())
  );
  router.get("/documentos", adaptRoute(new ListarDocumentosController()));
  router.patch("/documentos/:id", adaptRoute(new EditarDocumento()));
};



