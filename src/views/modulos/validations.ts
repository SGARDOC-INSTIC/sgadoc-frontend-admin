import * as yup from "yup";

//const curso = useState<any[]>([]);
//const certificado = useState<any[]>([]);
//const validCurso = curso.map(( id ) => id);
//const validCertificado = certificado.map(( {ID_CERTIFICADO} ) => ID_CERTIFICADO);

export const ModulosForm = yup.object().shape({
  DS_MODULO: yup
    .string()
    .min(2, "Preencha o módulo")
    .max(255, "Só é permitido 255 caracteres para o módulo")
    .required("Este é um campo obrigatório"),
  DS_RESUMO: yup
    .string()
    .min(2, "Preencha o módulo")
    .max(255, "Só é permitido 255 caracteres para o módulo")
    .required("Este é um campo obrigatório"),
  DS_DESCRICAO_DETALHADA: yup
    .string()
    .min(2, "Preencha o módulo")
    .max(255, "Só é permitido 255 caracteres para o módulo")
    .required("Este é um campo obrigatório"),
  CD_ORDENACAO: yup
    .number()
    .integer("A ordenação deve ser um número inteiro")
    .positive("A ordenação deve ser um número positivo")
    .typeError("A ordenação deve ser um número."),
  CD_REQUER_CONCLUSAO_ANTERIOR: yup.number(),
  CD_PROVA_AO_FINAL: yup.number(),
  VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO: yup
    .number()
    .integer("A prova deve ser um número inteiro")
    .positive("A prova deve ser um número positivo")
    .typeError("A prova deve ser um número."),
  VL_NOTA_MINIMA_CONCLUIR: yup
    .number()
    .integer("A nota deve ser um número inteiro")
    .positive("A nota deve ser um número positivo")
    .typeError("A nota deve ser um número."),
  DS_LINK_IMAGEM: yup.mixed().required("Este é um campo obrigatório"),
  DS_TEXTO_IMAGEM: yup
    .string()
    .min(2, "Preencha a descrição da imagem")
    .max(255, "Só é permitido 255 caracteres para descrição da imagem")
    .required("Este é um campo obrigatório"),
  NR_DIAS_PARA_CONCLUIR: yup
    .number()
    .integer("Este campo deve ser um número inteiro")
    .positive("Este campo deve ser um número positivo")
    .typeError("Este campo deve ser um número."),
  NR_TENTATIVAS_MAX_PROVA: yup
    .number()
    .integer("Este campo deve ser um número inteiro")
    .positive("Este campo deve ser um número positivo")
    .typeError("Este campo deve ser um número."),
  VL_CARGA_HORARIA: yup.number().required("Este é um campo obrigatório"),
  ID_CERTIFICADO: yup.string().required("Este é um campo obrigatório"),
  ID_CURSO: yup.string().required("Este é um campo obrigatório"),
});
