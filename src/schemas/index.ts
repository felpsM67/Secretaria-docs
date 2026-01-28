import * as z from "zod";

export const createUserSchema = z.object({
  nome: z
    .string({ error: "O nome de usuario é obrigatório" })
    .min(3, { error: "O nome de usuario deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome de usuario deve ter no máximo 30 caracteres" }),
  email: z.email({ error: "O email está no formato incorreto" }),
  senha: z
    .string({ error: "A senha é obrigatória" })
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" }),
  telefone: z
    .string()
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" })
    .optional(),
  role: z.enum(["Gerente", "Funcionario", "Cliente"], {
    error: "A role deve ser 'Gerente', 'Funcionario' ou 'Cliente'",
  }),
});

export const updateUserSchema = z.object({
  nome: z
    .string({ error: "O nome de usuario é obrigatório." })
    .min(3, { error: "O nome de usuario deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome de usuario deve ter no máximo 30 caracteres" })
    .optional(),
  senha: z
    .string()
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" })
    .optional(),
  role: z
    .enum(["Gerente", "Funcionario", "Cliente"], {
      error: "A role deve ser 'Gerente', 'Funcionario' ou 'Cliente'",
    })
    .optional(),
});

export const loginSchema = z.object({
  email: z.email({ error: "O email está no formato incorreto" }),
  senha: z
    .string()
    .min(6, { error: "A senha deve ter no minimo 6 caracteres" })
    .max(8, { error: "A senha deve ter no máximo 8 caracteres" }),
});

export const loginResponseSchema = z.object({
  message: z.string(),
  token: z.string(),
  refreshToken: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string({ error: "O refresh token é obrigatório" }),
});


export const authResponseSchema = z.object({
  token: z.string(),
  userId: z.number(),
  role: z.enum(["Gerente", "Funcionario", "Cliente"]),
});



export const createClienteSchema = z.object({
  nome: z
    .string({ error: "O nome do cliente é obrigatório." })
    .min(3, { error: "O nome do cliente deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome do cliente deve ter no máximo 30 caracteres" }),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" }),
  endereco: z
    .string({ error: "O endereço é obrigatório." })
    .min(5, { error: "O endereço deve ter no mínimo 5 caracteres" })
    .max(100, { error: "O endereço deve ter no máximo 100 caracteres" }),
  userId: z.number({ error: "O ID do usuário é obrigatório." }),
});

export const createFuncionarioSchema = z.object({
  nome: z
    .string({ error: "O nome do funcionário é obrigatório." })
    .min(3, { error: "O nome do funcionário deve ter no mínimo 3 caracteres" })
    .max(30, {
      error: "O nome do funcionário deve ter no máximo 30 caracteres",
    }),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" }),
  cargo: z
    .string({ error: "O cargo é obrigatório." })
    .min(3, { error: "O cargo deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O cargo deve ter no máximo 30 caracteres" }),
  userId: z.number({ error: "O ID do usuário é obrigatório." }),
});

export const createGerenteSchema = z.object({
  nome: z
    .string({ error: "O nome do gerente é obrigatório." })
    .min(3, { error: "O nome do gerente deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome do gerente deve ter no máximo 30 caracteres" }),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" }),
  departamento: z
    .string({ error: "O departamento é obrigatório." })
    .min(3, { error: "O departamento deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O departamento deve ter no máximo 30 caracteres" }),
  userId: z.number({ error: "O ID do usuário é obrigatório." }),
});

export const updateClienteSchema = z.object({
  nome: z
    .string({ error: "O nome do cliente é obrigatório." })
    .min(3, { error: "O nome do cliente deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome do cliente deve ter no máximo 30 caracteres" })
    .optional(),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" })
    .optional(),
  endereco: z
    .string({ error: "O endereço é obrigatório." })
    .min(5, { error: "O endereço deve ter no mínimo 5 caracteres" })
    .max(100, { error: "O endereço deve ter no máximo 100 caracteres" })
    .optional(),
});

export const updateFuncionarioSchema = z.object({
  nome: z
    .string({ error: "O nome do funcionário é obrigatório." })
    .min(3, { error: "O nome do funcionário deve ter no mínimo 3 caracteres" })
    .max(30, {
      error: "O nome do funcionário deve ter no máximo 30 caracteres",
    })
    .optional(),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" })
    .optional(),
  cargo: z
    .string({ error: "O cargo é obrigatório." })
    .min(3, { error: "O cargo deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O cargo deve ter no máximo 30 caracteres" })
    .optional(),
});

export const updateGerenteSchema = z.object({
  nome: z
    .string({ error: "O nome do gerente é obrigatório." })
    .min(3, { error: "O nome do gerente deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O nome do gerente deve ter no máximo 30 caracteres" })
    .optional(),
  telefone: z
    .string({ error: "O telefone é obrigatório." })
    .min(10, { error: "O telefone deve ter no mínimo 10 caracteres" })
    .max(15, { error: "O telefone deve ter no máximo 15 caracteres" })
    .optional(),
  departamento: z
    .string({ error: "O departamento é obrigatório." })
    .min(3, { error: "O departamento deve ter no mínimo 3 caracteres" })
    .max(30, { error: "O departamento deve ter no máximo 30 caracteres" })
    .optional(),
});
