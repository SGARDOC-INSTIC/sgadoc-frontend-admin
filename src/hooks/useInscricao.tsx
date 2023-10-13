import React, { useState, useEffect, useContext, createContext } from "react";
import {
  InscricaoProviderProps,
  InscricaoProps,
  InscricaoData,
} from "../views/inscricoes-exame-acesso/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type InscricaoContextData = {
  inscricao: InscricaoProps[];
  createInscricao: (data: InscricaoData) => Promise<void>;
  // deleteCurso: ({ ID_CURSO }: CursosProps) => Promise<void>;
  updateInscricao: (data: InscricaoData) => Promise<void>;
};

const InscricaoContext = createContext<InscricaoContextData>(
  {} as InscricaoContextData
);

export function InscricaoProvider({ children }: InscricaoProviderProps) {
  const [inscricao, setInscricao] = useState<InscricaoProps[]>([]);

  useEffect(() => {
    try {
      api
        .get("/inscricoesAprovadas")
        .then((response) => setInscricao(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createInscricao(data: InscricaoData) {
    const result = await api.post("/inscricaoCreate", data);
    Swal.fire("Inscrito (a)!", "Inscrição feita com sucesso", "success");
    setInscricao([...inscricao, result.data]);
    api
      .get("/inscricoesAprovadas")
      .then((response) => setInscricao(response.data));
    console.log(result.data);
  }

  async function updateInscricao(data: InscricaoData) {
    const id = localStorage.getItem("data-inscricao");
    const result = await api.patch(`/inscricaoUpdate/${id}`, data);
    Swal.fire("Editado!", "Inscrição editada com sucesso", "success");
    setInscricao([...inscricao, result.data]);
    api
      .get("/inscricoesAprovadas")
      .then((response) => setInscricao(response.data));
    console.log(result.data);
  }

  return (
    <InscricaoContext.Provider
      value={{ inscricao, createInscricao, updateInscricao }}
    >
      {children}
    </InscricaoContext.Provider>
  );
}

export function useInscricao() {
  const context = useContext(InscricaoContext);
  return context;
}
