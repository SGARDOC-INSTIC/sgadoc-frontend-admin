import * as yup from "yup";

//const modulo = useState<any[]>([]);
//const validModulo = modulo.map(( id ) => id);

export const AulasForm = yup.object().shape({
  DS_RESUMO: yup
    .string()
    .min(2, "Preencha o módulo")
    .max(255, "Só é permitido 255 caracteres para o módulo")
    .required("Este é um campo obrigatório"),
  DS_DESCRICAO: yup
    .string()
    .min(2, "Preencha o módulo")
    .max(255, "Só é permitido 255 caracteres para o módulo")
    .required("Este é um campo obrigatório"),
  CD_ORDENACAO: yup
    .number()
    .integer("A ordenação deve ser um número inteiro")
    .positive("A ordenação deve ser um número positivo")
    .typeError("A ordenação deve ser um número."),
  VL_CONSIDERAR_COMPLETA: yup.number().required("Este é um campo obrigatório"),
  VL_STATUS: yup.number().required("Este é um campo obrigatório"),
  VL_ATUAL: yup.number().required("Este é um campo obrigatório"),
  ID_MODULO: yup
    .string()
    //.oneOf(validCurso, "Selecione um tratamento, por favor!")
    .required("Este é um campo obrigatório"),
});
