import * as yup from "yup";

export const CursoForm = yup.object().shape({
  DS_NOME_CURSO: yup
    .string()
    .min(2, "Preencha o nome do curso")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Este é um campo obrigatório"),
  DS_CURSO: yup
    .string()
    .min(2, "Preencha a descrição")
    .max(255, "Só é permitido 255 caracteres para a descrição"),
  DS_RESUMO: yup
    .string()
    .min(2, "Preencha o resumo")
    .max(255, "Só é permitido 255 caracteres para o resumo")
    .required("Este é um campo obrigatório"),
  ID_TIPO: yup.string().required("Este é um campo obrigatório"),
  ID__SUB_TIPO: yup.string().required("Este é um campo obrigatório"),
  ID_CERTIFICADO: yup.string(),
  CD_STATUS: yup.string().required("Este é um campo obrigatório"),
  DS_TEXTO_IMAGEM1: yup
    .string()
    .min(2, "Preencha o alt")
    .max(255, "Só é permitido 255 caracteres para este campo")
    .required("Este é um campo obrigatório"),
  DS_TEXTO_IMAGEM2: yup
    .string()
    .min(2, "Preencha o alt")
    .max(255, "Só é permitido 255 caracteres para este campo"),
  DS_TEXTO_IMAGEM3: yup
    .string()
    .min(2, "Preencha seu nome completo")
    .max(255, "Só é permitido 255 caracteres para este campo"),
  DS_LINK_IMAGEM1: yup.string(),
  DS_LINK_IMAGEM2: yup.string(),
  DS_LINK_IMAGEM3: yup.string(),
});
