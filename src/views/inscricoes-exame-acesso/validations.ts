import * as yup from "yup";

export const InscricaoForm = yup.object().shape({
  provinciaId: yup.number().required("Este é um campo obrigatório"),
  municipioId: yup.number().required("Este é um campo obrigatório"),
  estadoCivilId: yup.number().required("Este é um campo obrigatório"),
  generoId: yup.number().required("Este é um campo obrigatório"),
  opcao1CursoId: yup.string().required("Este é um campo obrigatório"),
  opcao2CursoId: yup.string().required("Este é um campo obrigatório"),
  nome: yup
    .string()
    .min(2, "Preencha o campo nome")
    .max(255, "Só é permitido 255 caracteres para o nome")
    .required("Este é um campo obrigatório"),
  nomePai: yup
    .string()
    .min(2, "Preencha o campo nome do pai")
    .max(255, "Só é permitido 255 caracteres para o nome do pai")
    .required("Este é um campo obrigatório"),
  nomeMae: yup
    .string()
    .min(2, "Preencha o campo nome da mãe")
    .max(255, "Só é permitido 255 caracteres para o nome da mãe")
    .required("Este é um campo obrigatório"),
  email: yup
    .string()
    .min(2, "Preencha o campo email")
    .max(255, "Só é permitido 255 caracteres para o email")
    .required("Este é um campo obrigatório"),
  dataNascimento: yup.date().required("Este é um campo obrigatório"),
  numeroBi: yup
    .string()
    .required("Este é um campo obrigatório")
    .min(14, "O número do BI deve ter 14 caracteres")
    .max(14, "Só é permitido 14 caracteres para o número do BI"),
  dataEmissaoBi: yup.date().required("Este é um campo obrigatório"),
  validadeBi: yup.date().required("Este é um campo obrigatório"),
  arquivoIdentificacao: yup.string().required("Este é um campo obrigatório"),
  telefonePrincipal: yup
    .number()
    .required("Este é um campo obrigatório")
    .positive("O campo deve ser positivo")
    .integer("O campo deve ser um número inteiro"),
  certificadoEnsinoMedio: yup.string().required("Este é um campo obrigatório"),
  carregamentoFotografia: yup.string().required("Este é um campo obrigatório"),
  comprovativoPagamento: yup.string().required("Este é um campo obrigatório"),
});
