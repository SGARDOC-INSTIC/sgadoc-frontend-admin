export type ModulosProps = {
  ID_MODULO: any;
  DS_MODULO: string;
  DS_RESUMO: string;
  DS_DESCRICAO_DETALHADA: string;
  CD_ORDENACAO: string;
  CD_REQUER_CONCLUSAO_ANTERIOR: string;
  CD_PROVA_AO_FINAL: string;
  VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO: string;
  VL_NOTA_MINIMA_CONCLUIR: string;
  DS_LINK_IMAGEM: string;
  DS_TEXTO_IMAGEM: string;
  NR_DIAS_PARA_CONCLUIR: string;
  NR_TENTATIVAS_MAX_PROVA: string;
  VL_CARGA_HORARIA: string;
  ID_CERTIFICADO: string;
  ID_CURSO: string;
};

export type ModulosData = Omit<ModulosProps, "ID_MODULO">;

export type ModulosProviderProps = {
  children: React.ReactNode;
};
