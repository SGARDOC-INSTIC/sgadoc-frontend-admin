import React from "react";
import { AulasData, AulasProps } from "../type";
import { AulasForm } from "../validations";
import CIcon from "@coreui/icons-react";
import { MdOutlineError } from "react-icons/md";
import { Formik } from "formik";
import "../styles.scss";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFade,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useAula } from "src/hooks/useAula";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useModulo } from "src/hooks/useModulo";

const AddAulas: React.FC<AulasProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { createAula } = useAula();
  const { modulo } = useModulo();

  async function handleCreateNewAula(data: AulasData) {
    try {
      await createAula(data);
      history.push("/aula/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, preencha todos os campos", "error");
      console.log(error.message);
    }
  }
  return (
    <>
      <CRow>
        <CCol xs="12">
          <CFade timeout={300} in={showElements} unmountOnExit={true}>
            <CCard>
              <CCardHeader
                style={{
                  background: "#39f",
                  color: "white",
                  fontSize: "1rem",
                }}
              >
                Faça aqui o cadastro das aulas
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-setting"
                  >
                    <CIcon name="cil-settings" />
                  </CButton>
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed(!collapsed)}
                  >
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCardHeader>
              <CCardBody>
                <Formik
                  initialValues={{
                    ID_MODULO: "",
                    VL_CONSIDERAR_COMPLETA: "",
                    CD_ORDENACAO: "",
                    DS_DESCRICAO: "",
                    DS_RESUMO: "",
                    CD_STATUS: "",
                    VL_ATUAL: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={AulasForm}
                >
                  {({
                    values,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    errors,
                    touched,
                  }) => (
                    <>
                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="ID_CURSO">
                            Selecciona um módulo
                          </CLabel>
                          <CSelect
                            id="ID_CURSO"
                            name="ID_CURSO"
                            value={values.ID_MODULO}
                            onBlur={handleBlur("ID_MODULO")}
                            onChange={handleChange("ID_MODULO")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            {modulo.map((item: any) => {
                              return (
                                <option value={item.ID_MODULO}>
                                  {item.DS_MODULO}
                                </option>
                              );
                            })}
                          </CSelect>

                          {touched.ID_MODULO && errors.ID_MODULO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.ID_MODULO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="descricao">Descrição</CLabel>
                          <CInput
                            id="descricao"
                            name="descricao"
                            value={values.DS_DESCRICAO}
                            onBlur={handleBlur("DS_DESCRICAO")}
                            onChange={handleChange("DS_DESCRICAO")}
                            className={
                              touched.DS_DESCRICAO && errors.DS_DESCRICAO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_DESCRICAO_DETALHADA"
                          />
                          {touched.DS_DESCRICAO && errors.DS_DESCRICAO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_DESCRICAO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="14">
                          <CLabel htmlFor="resumo">Resumo</CLabel>
                          <CTextarea
                            id="resumo"
                            name="resumo"
                            value={values.DS_RESUMO}
                            onBlur={handleBlur("DS_RESUMO")}
                            onChange={handleChange("DS_RESUMO")}
                            className={
                              touched.DS_RESUMO && errors.DS_RESUMO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_RESUMO"
                          />
                          {touched.DS_RESUMO && errors.DS_RESUMO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_RESUMO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="CD_ORDENACAO">Ordenação</CLabel>
                          <CInput
                            type="number"
                            id="CD_ORDENACAO"
                            name="CD_ORDENACAO"
                            value={values.CD_ORDENACAO}
                            onBlur={handleBlur("CD_ORDENACAO")}
                            onChange={handleChange("CD_ORDENACAO")}
                            className={
                              touched.CD_ORDENACAO && errors.CD_ORDENACAO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="CD_ORDENACAO"
                          />
                          {touched.CD_ORDENACAO && errors.CD_ORDENACAO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.CD_ORDENACAO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="ID_CURSO">
                            Considerar Completa?
                          </CLabel>
                          <CSelect
                            id="VL_CONSIDERAR_COMPLETA"
                            name="VL_CONSIDERAR_COMPLETA"
                            value={values.VL_CONSIDERAR_COMPLETA}
                            onBlur={handleBlur("VL_CONSIDERAR_COMPLETA")}
                            onChange={handleChange("VL_CONSIDERAR_COMPLETA")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>

                          {touched.VL_CONSIDERAR_COMPLETA &&
                          errors.VL_CONSIDERAR_COMPLETA ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.VL_CONSIDERAR_COMPLETA}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="CD_STATUS">Status</CLabel>
                          <CSelect
                            id="CD_STATUS"
                            name="CD_STATUS"
                            value={values.CD_STATUS}
                            onBlur={handleBlur("CD_STATUS")}
                            onChange={handleChange("CD_STATUS")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Inativo</option>

                            <option value="1">Activo</option>
                          </CSelect>

                          {touched.CD_STATUS && errors.CD_STATUS ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.CD_STATUS}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_LINK_IMAGEM">
                            Valor Actual de Conclusão
                          </CLabel>
                          <CSelect
                            id="VL_ATUAL"
                            name="VL_ATUAL"
                            value={values.VL_ATUAL}
                            onBlur={handleBlur("VL_ATUAL")}
                            onChange={handleChange("VL_ATUAL")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Concluída</option>

                            <option value="1">Não Concluída</option>
                          </CSelect>
                          {touched.VL_ATUAL && errors.VL_ATUAL ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.VL_ATUAL}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <br />
                      <CButton
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={() => handleCreateNewAula(values)}
                      >
                        <CIcon name="cil-scrubber" /> Cadastrar
                      </CButton>
                    </>
                  )}
                </Formik>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default AddAulas;
