import React from "react";
import { ModulosProps } from "../type";
import { ModulosForm } from "../validations";
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
  CInputFile,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { ModulosData } from "../type";
import { useCertificado } from "src/hooks/useCertificado";
import { useModulo } from "src/hooks/useModulo";
import { useCurso } from "src/hooks/useCurso";

const AddModulo: React.FC<ModulosProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const { certificado } = useCertificado();
  const { curso } = useCurso();
  const { createModulo } = useModulo();

  async function handleCreateNewModulo(data: ModulosData) {
    await createModulo(data);
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
                Faça aqui o cadastro dos módulos
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
                    DS_MODULO: "",
                    DS_RESUMO: "",
                    DS_DESCRICAO_DETALHADA: "",
                    CD_ORDENACAO: "",
                    CD_REQUER_CONCLUSAO_ANTERIOR: "",
                    CD_PROVA_AO_FINAL: "",
                    VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO: "",
                    VL_NOTA_MINIMA_CONCLUIR: "",
                    DS_LINK_IMAGEM: "",
                    DS_TEXTO_IMAGEM: "",
                    NR_DIAS_PARA_CONCLUIR: "",
                    NR_TENTATIVAS_MAX_PROVA: "",
                    VL_CARGA_HORARIA: "",
                    ID_CERTIFICADO: "",
                    ID_CURSO: "",
                  }}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={ModulosForm}
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
                            Selecciona um curso
                          </CLabel>
                          <CSelect
                            id="ID_CURSO"
                            name="ID_CURSO"
                            value={values.ID_CURSO}
                            onBlur={handleBlur("ID_CURSO")}
                            onChange={handleChange("ID_CURSO")}
                          >
                            <option>Por favor, seleccione uma opção</option>
                            {curso.map((item: any) => {
                              return (
                                <option value={item.ID_CURSO}>
                                  {item.DS_CURSO}
                                </option>
                              );
                            })}
                          </CSelect>

                          {touched.ID_CURSO && errors.ID_CURSO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.ID_CURSO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_MODULO">Nome do Módulo</CLabel>
                          <CInput
                            id="DS_MODULO"
                            name="DS_MODULO"
                            value={values.DS_MODULO}
                            onBlur={handleBlur("DS_MODULO")}
                            onChange={handleChange("DS_MODULO")}
                            className={
                              touched.DS_MODULO && errors.DS_MODULO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_MODULO"
                          />
                          {touched.DS_MODULO && errors.DS_MODULO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_MODULO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="descricao">Descrição</CLabel>
                          <CInput
                            id="descricao"
                            name="descricao"
                            value={values.DS_DESCRICAO_DETALHADA}
                            onBlur={handleBlur("DS_DESCRICAO_DETALHADA")}
                            onChange={handleChange("DS_DESCRICAO_DETALHADA")}
                            className={
                              touched.DS_DESCRICAO_DETALHADA &&
                              errors.DS_DESCRICAO_DETALHADA
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_DESCRICAO_DETALHADA"
                          />
                          {touched.DS_DESCRICAO_DETALHADA &&
                          errors.DS_DESCRICAO_DETALHADA ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_DESCRICAO_DETALHADA}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="CD_ORDENACAO">Ordenação</CLabel>
                          <CInput
                            id="CD_ORDENACAO"
                            type="number"
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
                          <CLabel htmlFor="DS_TEXTO_IMAGEM">
                            Descrição da Imagem
                          </CLabel>
                          <CInput
                            id="DS_TEXTO_IMAGEM"
                            name="DS_TEXTO_IMAGEM"
                            value={values.DS_TEXTO_IMAGEM}
                            onBlur={handleBlur("DS_TEXTO_IMAGEM")}
                            onChange={handleChange("DS_TEXTO_IMAGEM")}
                            className={
                              touched.DS_TEXTO_IMAGEM && errors.DS_TEXTO_IMAGEM
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="alt1"
                          />
                          {touched.DS_TEXTO_IMAGEM && errors.DS_TEXTO_IMAGEM ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_TEXTO_IMAGEM}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="DS_LINK_IMAGEM">
                            Carregar imagem
                          </CLabel>
                          <CInputFile
                            type="file"
                            id="DS_LINK_IMAGEM"
                            name="DS_LINK_IMAGEM"
                            label="Default file input example"
                            value={values.DS_LINK_IMAGEM}
                            onBlur={handleBlur("DS_LINK_IMAGEM")}
                            onChange={handleChange("DS_LINK_IMAGEM")}
                            className={
                              touched.DS_LINK_IMAGEM && errors.DS_LINK_IMAGEM
                                ? "input-error"
                                : "none"
                            }
                          />
                          {touched.DS_LINK_IMAGEM && errors.DS_LINK_IMAGEM ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_LINK_IMAGEM}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO">
                            Percentagem de Conclusão
                          </CLabel>
                          <CInput
                            id="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                            name="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                            value={
                              values.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO
                            }
                            onBlur={handleBlur(
                              "VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                            )}
                            onChange={handleChange(
                              "VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                            )}
                            className={
                              touched.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO &&
                              errors.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                          />
                          {touched.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO &&
                          errors.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="VL_NOTA_MINIMA_CONCLUIR">
                            Nota Mínima Para Concluir
                          </CLabel>
                          <CInput
                            id="VL_NOTA_MINIMA_CONCLUIR"
                            name="VL_NOTA_MINIMA_CONCLUIR"
                            value={values.VL_NOTA_MINIMA_CONCLUIR}
                            onBlur={handleBlur("VL_NOTA_MINIMA_CONCLUIR")}
                            onChange={handleChange("VL_NOTA_MINIMA_CONCLUIR")}
                            className={
                              touched.VL_NOTA_MINIMA_CONCLUIR &&
                              errors.VL_NOTA_MINIMA_CONCLUIR
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="VL_NOTA_MINIMA_CONCLUIR"
                          />
                          {touched.VL_NOTA_MINIMA_CONCLUIR &&
                          errors.VL_NOTA_MINIMA_CONCLUIR ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.VL_NOTA_MINIMA_CONCLUIR}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="image">Carga Horária</CLabel>
                          <CInput
                            id="VL_CARGA_HORARIA"
                            name="VL_CARGA_HORARIA"
                            value={values.VL_CARGA_HORARIA}
                            onBlur={handleBlur("VL_CARGA_HORARIA")}
                            onChange={handleChange("VL_CARGA_HORARIA")}
                            className={
                              touched.VL_CARGA_HORARIA &&
                              errors.VL_CARGA_HORARIA
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="VL_CARGA_HORARIA"
                          />
                          {touched.VL_CARGA_HORARIA &&
                          errors.VL_CARGA_HORARIA ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.VL_CARGA_HORARIA}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="NR_DIAS_PARA_CONCLUIR">
                            Dias Para Concluir
                          </CLabel>
                          <CInput
                            id="NR_DIAS_PARA_CONCLUIR"
                            name="NR_DIAS_PARA_CONCLUIR"
                            value={values.NR_DIAS_PARA_CONCLUIR}
                            onBlur={handleBlur("NR_DIAS_PARA_CONCLUIR")}
                            onChange={handleChange("NR_DIAS_PARA_CONCLUIR")}
                            className={
                              touched.NR_DIAS_PARA_CONCLUIR &&
                              errors.NR_DIAS_PARA_CONCLUIR
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="NR_DIAS_PARA_CONCLUIR"
                          />
                          {touched.NR_DIAS_PARA_CONCLUIR &&
                          errors.NR_DIAS_PARA_CONCLUIR ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.NR_DIAS_PARA_CONCLUIR}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="NR_TENTATIVAS_MAX_PROVA">
                            Tentativas Máxima Para Prova
                          </CLabel>
                          <CInput
                            id="NR_TENTATIVAS_MAX_PROVA"
                            name="NR_TENTATIVAS_MAX_PROVA"
                            value={values.NR_TENTATIVAS_MAX_PROVA}
                            onBlur={handleBlur("NR_TENTATIVAS_MAX_PROVA")}
                            onChange={handleChange("NR_TENTATIVAS_MAX_PROVA")}
                            className={
                              touched.NR_TENTATIVAS_MAX_PROVA &&
                              errors.NR_TENTATIVAS_MAX_PROVA
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="NR_TENTATIVAS_MAX_PROVA"
                          />
                          {touched.NR_TENTATIVAS_MAX_PROVA &&
                          errors.NR_TENTATIVAS_MAX_PROVA ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.NR_TENTATIVAS_MAX_PROVA}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="CD_PROVA_AO_FINAL">
                            Prova Final
                          </CLabel>
                          <CSelect
                            id="CD_PROVA_AO_FINAL"
                            name="CD_PROVA_AO_FINAL"
                            value={values.CD_PROVA_AO_FINAL}
                            onBlur={handleBlur("CD_PROVA_AO_FINAL")}
                            onChange={handleChange("CD_PROVA_AO_FINAL")}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>
                          {touched.CD_PROVA_AO_FINAL &&
                          errors.CD_PROVA_AO_FINAL ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.CD_PROVA_AO_FINAL}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>
                      <CFormGroup row>
                        <CCol xs="12" md="6">
                          <CLabel htmlFor="CD_REQUER_CONCLUSAO_ANTERIOR">
                            Requer Conclusão Anterior
                          </CLabel>
                          <CSelect
                            id="CD_REQUER_CONCLUSAO_ANTERIOR"
                            name="CD_REQUER_CONCLUSAO_ANTERIOR"
                            value={values.CD_REQUER_CONCLUSAO_ANTERIOR}
                            onBlur={handleBlur("CD_REQUER_CONCLUSAO_ANTERIOR")}
                            onChange={handleChange(
                              "CD_REQUER_CONCLUSAO_ANTERIOR"
                            )}
                          >
                            <option>Por favor, seleccione uma opção</option>

                            <option value="0">Não</option>

                            <option value="1">Sim</option>
                          </CSelect>
                          {touched.CD_REQUER_CONCLUSAO_ANTERIOR &&
                          errors.CD_REQUER_CONCLUSAO_ANTERIOR ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.CD_REQUER_CONCLUSAO_ANTERIOR}
                            </div>
                          ) : null}
                        </CCol>

                        <CCol xs="12" md="6">
                          <CLabel htmlFor="image">Certificado</CLabel>
                          <CSelect
                            id="ID_CERTIFICADO"
                            name="ID_CERTIFICADO"
                            value={values.ID_CERTIFICADO}
                            onBlur={handleBlur("ID_CERTIFICADO")}
                            onChange={handleChange("ID_CERTIFICADO")}
                            className={
                              touched.ID_CERTIFICADO && errors.ID_CERTIFICADO
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="ID_CERTIFICADO"
                          >
                            <option value="0">
                              Por favor, seleccione um certificado
                            </option>
                            {certificado.map((item: any) => {
                              return (
                                <option value={item.ID_CERTIFICADO}>
                                  {item.DS_CERTIFICADO}
                                </option>
                              );
                            })}
                          </CSelect>
                          {touched.ID_CERTIFICADO && errors.ID_CERTIFICADO ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.ID_CERTIFICADO}
                            </div>
                          ) : null}
                        </CCol>
                      </CFormGroup>

                      <br />
                      <CButton
                        type="submit"
                        size="sm"
                        color="info"
                        onClick={() => handleCreateNewModulo(values)}
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

export default AddModulo;
