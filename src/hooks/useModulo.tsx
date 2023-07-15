import React, { useState, useEffect, useContext, createContext } from "react";
import {
  ModulosProviderProps,
  ModulosProps,
  ModulosData,
} from "../views/modulos/type";
import Swal from "sweetalert2";
import { api } from "../services/api";
import { AxiosError } from "axios";

type ModuloContextData = {
  modulo: ModulosProps[];
  createModulo: (data: ModulosData) => Promise<void>;
  updateModulo: (data: ModulosProps) => Promise<void>;
  deleteModulo: ({ ID_CURSO }: ModulosProps) => Promise<void>;
};

const ModuloContext = createContext<ModuloContextData>({} as ModuloContextData);

export function ModulosProvider({ children }: ModulosProviderProps) {
  const [modulo, setModulo] = useState<ModulosProps[]>([]);

  useEffect(() => {
    try {
      api.get("/produto/modulo").then((response) => setModulo(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createModulo(data: ModulosData) {
    const result = await api.post("/produto/modulo", data);
    Swal.fire("Parabéns!", "Módulo Cadastrado Com Sucesso", "success");
    setModulo([...modulo, result.data]);
    api.get("/produto/modulo").then((response) => setModulo(response.data));
    console.log(result.data);
  }

  async function updateModulo(data: ModulosProps) {
    const result = await api.put("/produto/modulo", data);
    Swal.fire("Parabéns!", "Módulo Editado Com Sucesso", "success");
    setModulo([...modulo, result.data]);
    api.get("/produto/modulo").then((response) => setModulo(response.data));
    console.log(result.data);
  }

  async function deleteModulo(params: any) {
    try {
      const ID_MODULO = params?.ID_MODULO;
      const result = await api.get(`/produto/modulo/delete/${ID_MODULO}`);
      Swal.fire("Deletado!", "Módulo excluído com sucesso.", "success");
      const response = modulo.filter((data) => data.ID_MODULO !== ID_MODULO);
      setModulo(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  return (
    <ModuloContext.Provider
      value={{ modulo, createModulo, updateModulo, deleteModulo }}
    >
      {children}
    </ModuloContext.Provider>
  );
}

export function useModulo() {
  const context = useContext(ModuloContext);
  return context;
}
