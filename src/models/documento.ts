import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../database";

interface DocumentAttributes {
  id: number;
  userId: string;
  type: "CPF" | "RG" | "COMPROVANTE_RESIDENCIA" | "HISTORICO_ESCOLAR";
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  status: "PENDENTE" | "APROVADO" | "REJEITADO";
  url: string;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, "id" | "status"> {}

export class DocumentModel extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
  public id!: number;
  public userId!: string;
  public type!: "CPF" | "RG" | "COMPROVANTE_RESIDENCIA" | "HISTORICO_ESCOLAR";
  public fileName!: string;
  public originalName!: string;
  public mimeType!: string;
  public size!: number;
  public path!: string;
  public status!: "PENDENTE" | "APROVADO" | "REJEITADO";
  public url!: string;
}

DocumentModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("CPF", "RG", "COMPROVANTE_RESIDENCIA", "HISTORICO_ESCOLAR"),
      allowNull: false,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PENDENTE", "APROVADO", "REJEITADO"),
      allowNull: false,
      defaultValue: "PENDENTE",
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "documentos",
  }
);

export default (s: Sequelize) => DocumentModel;