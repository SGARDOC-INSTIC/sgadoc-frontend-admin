import React, { useState, useEffect, useContext, createContext } from "react";
import { AulasProps, AulasProviderProps } from "../type";
import Swal from "sweetalert2";
import { useHistory } from "react-router";
import { api } from "../../../services/api";

type AulaContextData = {
  aula: AulasProps[];
  createAula: (data: AulasProps) => Promise<void>;
  deleteAula: (id: any) => Promise<void>;
  updateAula: (id: any) => Promise<void>;
};

const AulaContext = createContext<AulaContextData>({} as AulaContextData);

export function AulasProvider({ children }: AulasProviderProps) {
  const [aula, setAula] = useState<AulasProps[]>([]);
  const history = useHistory();

  useEffect(() => {
    async function handleSubmitGet() {
      const result = await api.get("/produto/modulo");
      setAula(result.data);
    }
    handleSubmitGet();
  }, []);

  async function createAula(data: AulasProps) {
    const result = await api.post("/aula/modulo", {
      data,
    });
    Swal.fire("Cadastrado!", "Cadastro feito com sucesso.", "success");
    history.push("/modulo/list");
    console.log(result.data);
  }

  async function deleteAula(params: any) {
    const id = params?.id;
    const result = await api.delete<any>(`/aula/modulo/${id}`);
    console.log(result.data);
  }

  async function updateAula(id: any) {
    localStorage.setItems("dataId", id);
    history.push(`/aula/edit${id}`);
  }

  return (
    <AulaContext.Provider value={{ aula, createAula, deleteAula, updateAula }}>
      {children}
    </AulaContext.Provider>
  );
}

export function useNewAccount() {
  const context = useContext(AulaContext);
  return context;
}
