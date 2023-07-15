import React, { useState, useEffect, useContext, createContext } from "react";
import { ModulosProps, ModulosProviderProps } from "../type";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { api } from "../../../services/api";

type ModuloContextData = {
  modulo: ModulosProps[];
  createModulo: (data: ModulosProps) => Promise<void>;
  deleteModulo: (id: any) => Promise<void>;
  updateModulo: (id: any) => Promise<void>;
};

const ModuloContext = createContext<ModuloContextData>({} as ModuloContextData);

export function MenuItemsProvider({ children }: ModulosProviderProps) {
  const [modulo, setModulo] = useState<ModulosProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function handleSubmitGet() {
      const result = await api.get("/produto/modulo");
      setModulo(result.data);
    }
    handleSubmitGet();
  }, []);

  async function createModulo(data: ModulosProps) {
    const result = await api.post("/produto/modulo", {
      data,
    });
    Swal.fire("Cadastrado!", "Cadastro feito com sucesso.", "success");
    history.push("/modulo/list");
    console.log(result.data);
  }

  async function deleteModulo(params: any) {
    const id = params?.id;
    const result = await api.delete<any>(`/produto/modulo/${id}`);
    console.log(result.data);
  }

  async function updateModulo(id: any) {
    localStorage.setItems("dataId", id);
    history.push(`/menuprincipal/edit${id}`);
  }

  return (
    <ModuloContext.Provider
      value={{ modulo, createModulo, deleteModulo, updateModulo }}
    >
      {children}
    </ModuloContext.Provider>
  );
}

export function useNewAccount() {
  const context = useContext(ModuloContext);
  return context;
}
