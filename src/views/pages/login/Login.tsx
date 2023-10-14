import React from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import api from "../../../services/api";
import Swal from "sweetalert2";
import { MdOutlineError } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { LoginForm } from "./validations";
import { Formik } from "formik";
import { loginProps } from "./type";
import "./styles.scss";

const Login = () => {
  const history = useHistory();

  async function sessao({ email, senha }: loginProps) {
    try {
      const response = await api.post("/login", { email, senha });
      localStorage.setItem("sgardoc-instic", response.data.token);
      localStorage.setItem("usuario-logado", response.data.usuario);
      history.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops", "Email ou senha inválida, tente novamente", "error");
      console.log(error.message);
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <Formik
                    initialValues={{
                      email: "",
                      senha: "",
                    }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                    validationSchema={LoginForm}
                  >
                    {({
                      values,
                      handleChange,
                      handleSubmit,
                      handleBlur,
                      errors,
                      touched,
                    }) => (
                      <CForm>
                        <h3 className="text-muted">Login</h3>
                        <p className="text-muted">Faça login em sua conta</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupText>
                            <CIcon name="cil-user" />
                          </CInputGroupText>
                          <CInput
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={values.email}
                            onBlur={handleBlur("email")}
                            onChange={handleChange("email")}
                            className={
                              touched.email && errors.email
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="email"
                          />
                        </CInputGroup>
                        {touched.email && errors.email ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.email}
                          </div>
                        ) : null}
                        <CInputGroup className="mb-4">
                          <CInputGroupText>
                            <CIcon name="cil-lock-locked" />
                          </CInputGroupText>
                          <CInput
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            value={values.senha}
                            onBlur={handleBlur("senha")}
                            onChange={handleChange("senha")}
                            className={
                              touched.senha && errors.senha
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="senha"
                          />
                        </CInputGroup>
                        {touched.senha && errors.senha ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.senha}
                          </div>
                        ) : null}
                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              className="px-4"
                              color="primary"
                              onClick={() => sessao(values)}
                            >
                              Conecta-se
                            </CButton>
                          </CCol>
                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Esqueceu sua senha?
                            </CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    )}
                  </Formik>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-flex flex-row align-items-center border">
                <div>
                  <div className="text-center">
                    <img
                      src="/logo-white.png"
                      alt="logo"
                      width="60px"
                      height="60px"
                    />
                  </div>

                  <CCardBody className="text-center">
                    <div>
                      <h6>BEM-VINDO (A) AO SGARDOC INSTIC 🎓</h6>
                      <p>
                        Um sistema de gestão acadêmica e de requisição de
                        documentos para o Instituto de Tecnologias de Informação
                        e Comunicação.
                      </p>
                    </div>
                  </CCardBody>
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
