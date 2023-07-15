import React, { useState, useEffect, useContext, createContext } from "react";
import {
  CursosProviderProps,
  CursosProps,
  CursosData,
} from "../views/cursos/type";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { api } from "../services/api";

type CursoContextData = {
  curso: CursosProps[];
  createCurso: (data: CursosData) => Promise<void>;
  deleteCurso: ({ ID_CURSO }: CursosProps) => Promise<void>;
  updateCurso: (data: CursosProps) => Promise<void>;
};

const CursoContext = createContext<CursoContextData>({} as CursoContextData);

export function CursosProvider({ children }: CursosProviderProps) {
  const [curso, setCurso] = useState<CursosProps[]>([]);

  useEffect(() => {
    try {
      api.get("/produto/cursos").then((response) => setCurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  }, []);

  async function createCurso(data: CursosData) {
    const result = await api.post("/produto/curso", data);
    Swal.fire("Parabéns!", "Curso Cadastrado Com Sucesso", "success");
    setCurso([...curso, result.data]);
    api.get("/produto/cursos").then((response) => setCurso(response.data));
    console.log(result.data);
  }

  async function deleteCurso(params: any) {
    try {
      const ID_CURSO = params?.ID_CURSO;
      const result = await api.get(`/produto/curso/delete/${ID_CURSO}`);
      Swal.fire("Deletado!", "Curso excluído com sucesso.", "success");
      const response = curso.filter((data) => data.ID_CURSO !== ID_CURSO);
      setCurso(response);
      console.log(result);
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  async function updateCurso(data: CursosProps) {
    const result = await api.put("/produto/curso", data);
    Swal.fire("Parabéns!", "Curso Editado Com Sucesso", "success");
    setCurso([...curso, result.data]);
    api.get("/produto/cursos").then((response) => setCurso(response.data));
    console.log(result.data);
  }

  return (
    <CursoContext.Provider
      value={{ curso, createCurso, deleteCurso, updateCurso }}
    >
      {children}
    </CursoContext.Provider>
  );
}

export function useCurso() {
  const context = useContext(CursoContext);
  return context;
}
