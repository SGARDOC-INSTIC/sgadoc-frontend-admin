export type CursosProps = {
  ID_CURSO: any;
  DS_CURSO: string;
  DS_RESUMO: string;
  DS_NOME_CURSO: string;
  ID_TIPO: string;
  ID_SUB_TIPO: string;
  CD_STATUS: string;
  DS_LINK_IMAGEM1: string;
  DS_TEXTO_IMAGEM1: string;
  DS_LINK_IMAGEM2: string;
  DS_TEXTO_IMAGEM2: string;
  DS_LINK_IMAGEM3: string;
  DS_TEXTO_IMAGEM3: string;
  ID_CERTIFICADO: string;
};

export type CursosData = Omit<CursosProps, "ID_CURSO">;

export type CursosProviderProps = {
  children: React.ReactNode;
};
