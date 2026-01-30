import PDFDocument from 'pdfkit';
import fs from 'fs';

export class PdfService {
  static async convertImageToPdf(imagePath: string, outputPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Usamos 'any' para o documento para evitar erros de tipagem com métodos internos do pdfkit no TS
      const doc = new PDFDocument({ autoFirstPage: false }) as any;
      const stream = fs.createWriteStream(outputPath);

      doc.pipe(stream);

      try {
        // Abre a imagem para pegar as dimensões
        const img = doc.openImage(imagePath);
        
        // Adiciona uma página com o mesmo tamanho da imagem
        doc.addPage({ size: [img.width, img.height] });
        
        // Desenha a imagem na página
        doc.image(img, 0, 0);
        
        doc.end();
      } catch (err) {
        reject(err);
      }

      stream.on('finish', () => resolve());
      stream.on('error', (err) => reject(err));
    });
  }
}