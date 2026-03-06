import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "../config/database";

// 1. Atributos que existem na tabela
export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user'; // auth e auto
}

// 2. Atributos necessários para criar (id é auto incremento)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'role'> {}

// 3. Classe do modelo
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: 'admin' | 'user';
}


// 4. Inicialização do modelo (mapeia pra tabela)
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "users",
    timestamps: false
  }
);
