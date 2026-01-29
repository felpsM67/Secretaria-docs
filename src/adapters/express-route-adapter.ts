import { Controller } from "@/protocols/controller";
import { HttpRequest } from "@/protocols/http";
import { Request, Response } from "express";

const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file,
      files: req.files,
    };
    
    const httpResponse = await controller.handle(httpRequest);
    
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      const errorMessage = httpResponse.body instanceof Error 
        ? httpResponse.body.message 
        : (httpResponse.body?.message || httpResponse.body?.error || "Erro interno");
        
      res.status(httpResponse.statusCode).json({
        error: errorMessage,
      });
    }
  };
};

export { adaptRoute };
export default adaptRoute;