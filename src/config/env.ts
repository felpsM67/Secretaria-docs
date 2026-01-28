import dotenv from "dotenv";
import path from "node:path";
import * as z from "zod";

// 1. Carrega o .env
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({
  path: [path.resolve(process.cwd(), envFile), path.resolve(process.cwd(), ".env")],
});

// 2. Define o Schema com os nomes que estão no seu .env
const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  
  API_VERSION: z.string().default("v1"),
  SWAGGER_ENABLED: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === "string" ? v === "true" : Boolean(v)))
    .default(true),

  // Segurança
  JWT_SECRET: z.string().min(16, "JWT_SECRET deve ter pelo menos 16 caracteres"),
  JWT_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_SECRET: z.string().min(16, "JWT_REFRESH_SECRET deve ter pelo menos 16 caracteres"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  
  SALT: z.coerce.number().int().positive().default(10),
  UPDATE_MODEL: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === "string" ? v === "true" : Boolean(v)))
    .default(false),

  // Banco de Dados (Mapeando conforme seu .env)
  DB_DIALECT: z.enum(["mysql", "mariadb", "postgres", "sqlite"]).default("mysql"),
  DB_HOST: z.string().default("0.0.0.0"),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USERNAME: z.string(), // No .env está DB_USERNAME
  DB_PASSWORD: z.string(), // No .env está DB_PASSWORD
  DB_NAME: z.string(),     // No .env está DB_NAME
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Erro de validação no .env:", JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// 3. Exporta o objeto formatado para manter compatibilidade com seu código antigo
const data = parsed.data;

export const ENV = {
  ...data,
  // Aqui criamos os "apelidos" que seu código antigo usava:
  DB_USER: data.DB_USERNAME, 
  DB_PASS: data.DB_PASSWORD,
  DB_DATABASE: data.DB_NAME,
};