import React, { useState, useEffect, useContext, createContext } from "react";
import { AulasProps, AulasProviderProps, AulasData } from "../views/aulas/type";
import { api } from "../services/api";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

type AulaContextData = {
  aula: AulasProps[];
  aulall: AulasProps[];
  createAula: (data: AulasData) => Promise<void>;
  deleteAula: ({ ID_MODULO_AULA }: AulasProps) => Promise<void>;
  updateAula: (data: AulasProps) => Promise<void>;
};

const AulaContext = createContext<AulaContextData>({} as AulaContextData);

export function AulaProvider({ children }: AulasProviderProps) {
  const [aula, setAula] = useState<AulasProps[]>([]);
  const [aulall, setAulall] = useState<AulasProps[]>([]);
  const ID_MODULO = localStorage.getItem("aula-modulo");

  useEffect(() => {
    try {
      api
        .get(`/produto/moduloaula/${ID_MODULO}/modulo`)
        .then((response) => setAula(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, [ID_MODULO]);

  useEffect(() => {
    try {
      api
        .get("/produto/moduloaula/aulas")
        .then((response) => setAulall(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createAula(data: AulasData) {
    const result = await api.post("/produto/moduloaula", data);
    Swal.fire("Parabéns!", "Curso Cadastrado Com Sucesso", "success");
    setAulall([...aulall, result.data]);
    api
      .get("/produto/moduloaula/aulas")
      .then((response) => setAulall(response.data));
    console.log(result.data);
  }

  async function deleteAula(params: any) {
    try {
      const ID_MODULO_AULA = params?.ID_MODULO_AULA;
      const result = await api.get(
        `/produto/moduloaula/delete/${ID_MODULO_AULA}`
      );
      Swal.fire("Deletado!", "Curso excluído com sucesso.", "success");
      const response = aulall.filter(
        (data) => data.ID_MODULO_AULA !== ID_MODULO_AULA
      );
      setAulall(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  async function updateAula(data: AulasProps) {
    const result = await api.put("/produto/moduloaula", data);
    Swal.fire("Parabéns!", "Curso Editado Com Sucesso", "success");
    setAulall([...aulall, result.data]);
    api
      .get("/produto/moduloaula/aulas")
      .then((response) => setAulall(response.data));
    console.log(result.data);
  }

  return (
    <AulaContext.Provider
      value={{ aulall, aula, createAula, deleteAula, updateAula }}
    >
      {children}
    </AulaContext.Provider>
  );
}

export function useAula() {
  const context = useContext(AulaContext);
  return context;
}
