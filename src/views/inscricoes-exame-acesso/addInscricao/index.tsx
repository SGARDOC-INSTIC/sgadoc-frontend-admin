import React from "react";
import { InscricaoProps, InscricaoData } from "../type";
import { InscricaoForm } from "../validations";
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
} from "@coreui/react";
import { useInscricao } from "src/hooks/useInscricao";
import { useProvincia } from "src/hooks/useProvincia";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import { useMunicipio } from "src/hooks/useMunicipio";
import { useEstadoCivil } from "src/hooks/useEstadoCivil";
import { useGenero } from "src/hooks/useGenero";
import { useCurso } from "src/hooks/useCurso";
import { UploadBi } from "../upload/upload-bi";
import { UploadCertificado } from "../upload/upload-certificado";
import { UploadFotografia } from "../upload/upload-fotografia";
import { UploadComprovativo } from "../upload/upload-comprovativo";

const AddInscricao: React.FC<InscricaoProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { createInscricao } = useInscricao();
  const { provincia } = useProvincia();
  const { municipio } = useMunicipio();
  const { estadoCivil } = useEstadoCivil();
  const { genero } = useGenero();
  const { curso } = useCurso();

  const bi = localStorage.getItem("firebase-bi");
  const certificado = localStorage.getItem("firebase-certificado");
  const fotografia = localStorage.getItem("firebase-fotografia");
  const comprovativo = localStorage.getItem("firebase-comprovativo");

  async function handleCreateNewRegister({
    provinciaId,
    municipioId,
    estadoCivilId,
    generoId,
    opcao1CursoId,
    opcao2CursoId,
    estadoId,
    nome,
    email,
    dataNascimento,
    numeroBi,
    dataEmissaoBi,
    validadeBi,
    arquivoIdentificacao,
    carregamentoBi,
    certificadoEnsinoMedio,
    carregamentoFotografia,
    comprovativoPagamento,
    telefonePrincipal,
    telefoneAlternativo,
    nomePai,
    nomeMae,
    criadoPor,
    actualizadoPor,
  }: InscricaoData) {
    try {
      await createInscricao({
        provinciaId,
        municipioId,
        estadoCivilId,
        generoId,
        opcao1CursoId,
        opcao2CursoId,
        estadoId,
        nome,
        email,
        dataNascimento,
        numeroBi,
        dataEmissaoBi,
        validadeBi,
        arquivoIdentificacao,
        carregamentoBi: bi,
        certificadoEnsinoMedio: certificado,
        carregamentoFotografia: fotografia,
        comprovativoPagamento: comprovativo,
        telefonePrincipal,
        telefoneAlternativo,
        nomePai,
        nomeMae,
        criadoPor,
        actualizadoPor,
      });
      history.push("/inscricoes/aprovadas");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente", "error");
      console.log(error.message);
    }
  }

  return (
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
              Faça aqui as inscrições de exame de acesso
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
                  provinciaId: "",
                  municipioId: "",
                  estadoCivilId: "",
                  generoId: "",
                  opcao1CursoId: "",
                  opcao2CursoId: "",
                  estadoId: 2,
                  nome: "",
                  email: "",
                  dataNascimento: "",
                  numeroBi: "",
                  dataEmissaoBi: "",
                  validadeBi: "",
                  arquivoIdentificacao: "",
                  carregamentoBi: "",
                  certificadoEnsinoMedio: "",
                  carregamentoFotografia: "",
                  comprovativoPagamento: "",
                  telefonePrincipal: "",
                  telefoneAlternativo: "",
                  nomePai: "",
                  nomeMae: "",
                  criadoPor: localStorage.getItem("usuario-logado"),
                  actualizadoPor: localStorage.getItem("usuario-logado"),
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
                validationSchema={InscricaoForm}
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
                        <CLabel htmlFor="provinciaId">
                          Selecciona uma província
                        </CLabel>
                        <CSelect
                          id="provinciaId"
                          name="provinciaId"
                          value={values.provinciaId}
                          onBlur={handleBlur("provinciaId")}
                          onChange={handleChange("provinciaId")}
                          className={
                            touched.provinciaId && errors.provinciaId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="provinciaId"
                        >
                          <option value="0">
                            Por favor, selecciona uma província
                          </option>
                          {provincia.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.provinciaId && errors.provinciaId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.provinciaId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="municipioId">
                          Selecciona um município
                        </CLabel>
                        <CSelect
                          id="municipioId"
                          name="municipioId"
                          value={values.municipioId}
                          onBlur={handleBlur("municipioId")}
                          onChange={handleChange("municipioId")}
                          className={
                            touched.municipioId && errors.municipioId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="nome"
                        >
                          <option value="0">
                            Por favor, seleccione um município
                          </option>
                          {municipio.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.municipioId && errors.municipioId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.municipioId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nome">Nome</CLabel>
                        <CInput
                          id="nome"
                          name="nome"
                          value={values.nome}
                          onBlur={handleBlur("nome")}
                          onChange={handleChange("nome")}
                          className={
                            touched.nome && errors.nome ? "input-error" : "none"
                          }
                          autoComplete="nome"
                        />
                        {touched.nome && errors.nome ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.nome}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="email">Email</CLabel>
                        <CInput
                          id="email"
                          name="email"
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
                        {touched.email && errors.email ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.email}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nomePai">Nome do Pai</CLabel>
                        <CInput
                          id="nomePai"
                          name="nomePai"
                          value={values.nomePai}
                          onBlur={handleBlur("nomePai")}
                          onChange={handleChange("nomePai")}
                          className={
                            touched.nomePai && errors.nomePai
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="nomePai"
                        />
                        {touched.nomePai && errors.nomePai ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.nomePai}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nomeMae">Nome da Mãe</CLabel>
                        <CInput
                          id="nomeMae"
                          name="nomeMae"
                          value={values.nomeMae}
                          onBlur={handleBlur("nomeMae")}
                          onChange={handleChange("nomeMae")}
                          className={
                            touched.nomeMae && errors.nomeMae
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="nomeMae"
                        />
                        {touched.nomeMae && errors.nomeMae ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.nomeMae}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="estadoCivilId">Estado Civil</CLabel>
                        <CSelect
                          id="estadoCivilId"
                          name="estadoCivilId"
                          value={values.estadoCivilId}
                          onBlur={handleBlur("estadoCivilId")}
                          onChange={handleChange("estadoCivilId")}
                          className={
                            touched.estadoCivilId && errors.estadoCivilId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="estadoCivilId"
                        >
                          <option value="0">
                            Por favor, seleccione o estado civil
                          </option>
                          {estadoCivil.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.estadoCivilId && errors.estadoCivilId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.estadoCivilId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="generoId">Gênero</CLabel>
                        <CSelect
                          id="generoId"
                          name="generoId"
                          value={values.generoId}
                          onBlur={handleBlur("generoId")}
                          onChange={handleChange("generoId")}
                          className={
                            touched.generoId && errors.generoId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="generoId"
                        >
                          <option value="0">
                            Por favor, seleccione o gênero
                          </option>
                          {genero.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.generoId && errors.generoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.generoId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="dataNascimento">
                          Data de nascimento
                        </CLabel>
                        <CInput
                          type="date"
                          id="dataNascimento"
                          name="dataNascimento"
                          value={values.dataNascimento}
                          onBlur={handleBlur("dataNascimento")}
                          onChange={handleChange("dataNascimento")}
                          className={
                            touched.dataNascimento && errors.dataNascimento
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="dataNascimento"
                        />
                        {touched.dataNascimento && errors.dataNascimento ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.dataNascimento}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nome">Número do BI</CLabel>
                        <CInput
                          id="numeroBi"
                          name="numeroBi"
                          value={values.numeroBi}
                          onBlur={handleBlur("numeroBi")}
                          onChange={handleChange("numeroBi")}
                          className={
                            touched.numeroBi && errors.numeroBi
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="numeroBi"
                        />
                        {touched.numeroBi && errors.numeroBi ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.numeroBi}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="email">
                          Arquivo de identificação
                        </CLabel>
                        <CSelect
                          id="arquivoIdentificacao"
                          name="arquivoIdentificacao"
                          value={values.arquivoIdentificacao}
                          onBlur={handleBlur("arquivoIdentificacao")}
                          onChange={handleChange("arquivoIdentificacao")}
                          className={
                            touched.arquivoIdentificacao &&
                            errors.arquivoIdentificacao
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="arquivoIdentificacao"
                        >
                          <option value="0">
                            Por favor, selecciona um item
                          </option>
                          {provincia.map((item: any) => {
                            return (
                              <option value={item.designacao}>
                                {item.designacao}
                              </option>
                            );
                          })}
                        </CSelect>
                        {touched.arquivoIdentificacao &&
                        errors.arquivoIdentificacao ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.arquivoIdentificacao}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="dataEmissaoBi">
                          Data de Emissão do BI
                        </CLabel>
                        <CInput
                          type="date"
                          id="dataEmissaoBi"
                          name="dataEmissaoBi"
                          value={values.dataEmissaoBi}
                          onBlur={handleBlur("dataEmissaoBi")}
                          onChange={handleChange("dataEmissaoBi")}
                          className={
                            touched.dataEmissaoBi && errors.dataEmissaoBi
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="dataEmissaoBi"
                        />
                        {touched.dataEmissaoBi && errors.dataEmissaoBi ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.dataEmissaoBi}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="validadeBi">validade do BI</CLabel>
                        <CInput
                          type="date"
                          id="validadeBi"
                          name="validadeBi"
                          value={values.validadeBi}
                          onBlur={handleBlur("validadeBi")}
                          onChange={handleChange("validadeBi")}
                          className={
                            touched.validadeBi && errors.validadeBi
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="validadeBi"
                        />
                        {touched.validadeBi && errors.validadeBi ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.validadeBi}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nome">Telefone Principal</CLabel>
                        <CInput
                          type="tel"
                          id="telefonePrincipal"
                          name="telefonePrincipal"
                          value={values.telefonePrincipal}
                          onBlur={handleBlur("telefonePrincipal")}
                          onChange={handleChange("telefonePrincipal")}
                          className={
                            touched.telefonePrincipal &&
                            errors.telefonePrincipal
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="telefonePrincipal"
                        />
                        {touched.telefonePrincipal &&
                        errors.telefonePrincipal ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.telefonePrincipal}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="telefoneAlternativo">
                          Telefone Alternativo
                        </CLabel>
                        <CInput
                          type="tel"
                          id="telefoneAlternativo"
                          name="telefoneAlternativo"
                          value={values.telefoneAlternativo}
                          onBlur={handleBlur("telefoneAlternativo")}
                          onChange={handleChange("telefoneAlternativo")}
                          className={
                            touched.telefoneAlternativo &&
                            errors.telefoneAlternativo
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="telefoneAlternativo"
                        />
                        {touched.telefoneAlternativo &&
                        errors.telefoneAlternativo ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.telefoneAlternativo}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="opcao1CursoId">Curso (opção 1)</CLabel>
                        <CSelect
                          id="opcao1CursoId"
                          name="opcao1CursoId"
                          value={values.opcao1CursoId}
                          onBlur={handleBlur("opcao1CursoId")}
                          onChange={handleChange("opcao1CursoId")}
                          className={
                            touched.opcao1CursoId && errors.opcao1CursoId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="opcao1CursoId"
                        >
                          <option value="0">
                            Por favor, seleccione o curso
                          </option>
                          {curso.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.opcao1CursoId && errors.opcao1CursoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.opcao1CursoId}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="opcao2CursoId">Curso (opção 2)</CLabel>
                        <CSelect
                          id="opcao2CursoId"
                          name="opcao2CursoId"
                          value={values.opcao2CursoId}
                          onBlur={handleBlur("opcao2CursoId")}
                          onChange={handleChange("opcao2CursoId")}
                          className={
                            touched.opcao2CursoId && errors.opcao2CursoId
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="opcao2CursoId"
                        >
                          <option value="0">
                            Por favor, seleccione o curso
                          </option>
                          {curso.map((item: any) => {
                            return (
                              <option value={item.id}>{item.designacao}</option>
                            );
                          })}
                        </CSelect>
                        {touched.opcao2CursoId && errors.opcao2CursoId ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.opcao2CursoId}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <br />
                    <h6>Carregamento do Bilhete de identidade (pdf/img)</h6>
                    <UploadBi />

                    <br />
                    <h6>Certificado do Ensino Médio (pdf/img)</h6>
                    <UploadCertificado />

                    <br />
                    <h6>Fotografia (img)</h6>
                    <UploadFotografia />

                    <br />
                    <h6>Comprovativo de pagamento (pdf/img)</h6>
                    <UploadComprovativo />

                    <br />
                    <CButton
                      type="submit"
                      size="sm"
                      color="info"
                      onClick={() => handleCreateNewRegister(values)}
                    >
                      <CIcon name="cil-scrubber" /> Inscrever Estudante
                    </CButton>
                  </>
                )}
              </Formik>
            </CCardBody>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
  );
};

export default AddInscricao;
