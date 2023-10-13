import * as yup from "yup";

export const LoginForm = yup.object().shape({
  email: yup.string().email("Email Inválido").required("Email é obrigatório"),
  senha: yup
    .string()
    .max(15, "O número máximo de caracteres é 15")
    .min(8, "Digite pelo menos 8 caracteres")
    .required("Senha é obrigatório"),
});
