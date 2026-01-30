import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, "..", "..", "uploads"));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, file.filename);
      // Se o arquivo vier sem nome, damos um nome genérico
      const originalName = file.originalname || "arquivo-sem-nome";
      const fileName = `${hash.toString("hex")}-${originalName}`;
      cb(null, fileName);
    });
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
  fileFilter: (req, file, cb) => {
    // Permitir tudo por enquanto para diagnosticar o que o Swagger está enviando
    cb(null, true);
  },
});
