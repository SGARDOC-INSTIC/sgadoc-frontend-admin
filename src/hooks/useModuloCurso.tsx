import React, { useState, useEffect, useContext, createContext } from "react";
import { ModulosProviderProps, ModulosProps } from "../views/modulos/type";
import Swal from "sweetalert2";
import { api } from "../services/api";
import { AxiosError } from "axios";

type ModuloContextData = {
  modulocurso: ModulosProps[];
};

const ModuloCursoContext = createContext<ModuloContextData>(
  {} as ModuloContextData
);

export function ModulosCursoProvider({ children }: ModulosProviderProps) {
  const [modulocurso, setModulocurso] = useState<ModulosProps[]>([]);

  useEffect(() => {
    const ID_CURSO = localStorage.getItem("data-modulo-list");
    try {
      api
        .get(`/produto/modulo/${ID_CURSO}/curso`)
        .then((response) => setModulocurso(response.data));
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
    }
  });

  return (
    <ModuloCursoContext.Provider value={{ modulocurso }}>
      {children}
    </ModuloCursoContext.Provider>
  );
}

export function useModuloCurso() {
  const context = useContext(ModuloCursoContext);
  return context;
}
