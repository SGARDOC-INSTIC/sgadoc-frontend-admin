export type AulasProps = {
  ID_MODULO_AULA: any;
  ID_MODULO: any;
  VL_CONSIDERAR_COMPLETA: any;
  CD_ORDENACAO: any;
  DS_DESCRICAO: string;
  DS_RESUMO: string;
  CD_STATUS: any;
  VL_ATUAL: any;
};

export type AulasData = Omit<AulasProps, "ID_MODULO_AULA">;

export type AulasProviderProps = {
  children: React.ReactNode;
};
