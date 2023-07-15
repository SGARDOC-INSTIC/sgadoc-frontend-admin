import React, { useState } from "react";
import { CursosProps, CursosData } from "../type";
import { CursoForm } from "../validations";
import CIcon from "@coreui/icons-react";
import { MdOutlineError } from "react-icons/md";
import { Formik } from "formik";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
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
  CProgress,
  CImg,
} from "@coreui/react";
import { useCurso } from "../../../hooks/useCurso";
import { useCertificado } from "src/hooks/useCertificado";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import Swal from "sweetalert2";

const AddCurso: React.FC<CursosProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { createCurso } = useCurso();
  const { certificado } = useCertificado();

  const [imgUrl1, setImgUrl1] = useState("");
  const [file1, setFile1] = useState([]);
  const [percent1, setPercent1] = useState(0);

  const [imgUrl2, setImgUrl2] = useState("");
  const [file2, setFile2] = useState([]);
  const [percent2, setPercent2] = useState(0);

  const [imgUrl3, setImgUrl3] = useState("");
  const [file3, setFile3] = useState([]);
  const [percent3, setPercent3] = useState(0);

  const handleUpload1 = () => {
    if (!file1) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file1}`);

    const uploadTask = uploadBytesResumable(storageRef, file1[0]);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent1(percent);
      },
      (err: any) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setImgUrl1(url);
          console.log(imgUrl1);
        });
      }
    );
  };

  const handleUpload2 = () => {
    if (!file2) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file2}`);

    const uploadTask = uploadBytesResumable(storageRef, file2[0]);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent2(percent);
      },
      (err: any) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setImgUrl2(url);
          console.log(imgUrl2);
        });
      }
    );
  };

  const handleUpload3 = () => {
    if (!file3) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file3}`);

    const uploadTask = uploadBytesResumable(storageRef, file3[0]);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent3(percent);
      },
      (err: any) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url: any) => {
          setImgUrl3(url);
          console.log(imgUrl3);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file1}`);
    const uploadTask = uploadBytesResumable(storageRef, file1[0]);
    uploadTask.cancel();
  };

  async function handleCreateNewCourse({
    DS_CURSO,
    DS_RESUMO,
    DS_NOME_CURSO,
    ID_TIPO,
    ID_SUB_TIPO,
    CD_STATUS,
    DS_LINK_IMAGEM1,
    DS_TEXTO_IMAGEM1,
    DS_LINK_IMAGEM2,
    DS_TEXTO_IMAGEM2,
    DS_LINK_IMAGEM3,
    DS_TEXTO_IMAGEM3,
    ID_CERTIFICADO,
  }: CursosData) {
    try {
      await createCurso({
        DS_CURSO,
        DS_RESUMO,
        DS_NOME_CURSO,
        ID_TIPO,
        ID_SUB_TIPO,
        CD_STATUS,
        DS_LINK_IMAGEM1: imgUrl1,
        DS_TEXTO_IMAGEM1,
        DS_LINK_IMAGEM2: imgUrl2,
        DS_TEXTO_IMAGEM2,
        DS_LINK_IMAGEM3: imgUrl3,
        DS_TEXTO_IMAGEM3,
        ID_CERTIFICADO,
      });
      history.push("/curso/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, preencha todos os campos", "error");
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
              Faça aqui o cadastro dos cursos
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
                  DS_CURSO: "",
                  DS_RESUMO: "",
                  DS_NOME_CURSO: "",
                  ID_TIPO: "",
                  ID_SUB_TIPO: "",
                  CD_STATUS: "",
                  DS_LINK_IMAGEM1: "",
                  DS_TEXTO_IMAGEM1: "",
                  DS_LINK_IMAGEM2: "",
                  DS_TEXTO_IMAGEM2: "",
                  DS_LINK_IMAGEM3: "",
                  DS_TEXTO_IMAGEM3: "",
                  ID_CERTIFICADO: "",
                }}
                onSubmit={(values) => {
                  console.log(values);
                }}
                validationSchema={CursoForm}
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
                        <CLabel htmlFor="ID_TIPO">Selecciona um tipo</CLabel>
                        <CSelect
                          id="ID_TIPO"
                          name="ID_TIPO"
                          value={values.ID_TIPO}
                          onBlur={handleBlur("ID_TIPO")}
                          onChange={handleChange("ID_TIPO")}
                          className={
                            touched.ID_TIPO && errors.ID_TIPO
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="ID_TIPO"
                        >
                          <option value="0">
                            Por favor, seleccione um tipo
                          </option>
                          <option value="1">Curso</option>
                          <option value="2">Arquivos</option>
                          <option value="3">Assinaturas</option>
                        </CSelect>
                        {touched.ID_TIPO && errors.ID_TIPO ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.ID_TIPO}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="ID_SUB_TIPO">
                          Selecciona um subtipo
                        </CLabel>
                        <CSelect
                          id="ID_SUB_TIPO"
                          name="ID_SUB_TIPO"
                          value={values.ID_SUB_TIPO}
                          onBlur={handleBlur("ID_SUB_TIPO")}
                          onChange={handleChange("ID_SUB_TIPO")}
                          className={
                            touched.ID_SUB_TIPO && errors.ID_SUB_TIPO
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="nome"
                        >
                          <option value="0">
                            Por favor, seleccione um tipo
                          </option>
                          <option value="1">Corte e Costura</option>
                          <option value="2">Dermatologia</option>
                          <option value="3">Sobrancelhas</option>
                        </CSelect>
                        {touched.ID_SUB_TIPO && errors.ID_SUB_TIPO ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.ID_SUB_TIPO}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="6">
                        <CLabel htmlFor="nome">Nome</CLabel>
                        <CInput
                          id="DS_NOME_CURSO"
                          name="DS_NOME_CURSO"
                          value={values.DS_NOME_CURSO}
                          onBlur={handleBlur("DS_NOME_CURSO")}
                          onChange={handleChange("DS_NOME_CURSO")}
                          className={
                            touched.DS_NOME_CURSO && errors.DS_NOME_CURSO
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="DS_NOME_CURSO"
                        />
                        {touched.DS_NOME_CURSO && errors.DS_NOME_CURSO ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.DS_NOME_CURSO}
                          </div>
                        ) : null}
                      </CCol>

                      <CCol xs="12" md="6">
                        <CLabel htmlFor="DS_CURSO">Descrição</CLabel>
                        <CInput
                          id="DS_CURSO"
                          name="DS_CURSO"
                          value={values.DS_CURSO}
                          onBlur={handleBlur("DS_CURSO")}
                          onChange={handleChange("DS_CURSO")}
                          className={
                            touched.DS_CURSO && errors.DS_CURSO
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="DS_CURSO"
                        />
                        {touched.DS_CURSO && errors.DS_CURSO ? (
                          <div className="errors">
                            <span className="icon">
                              <MdOutlineError />
                            </span>
                            {errors.DS_CURSO}
                          </div>
                        ) : null}
                      </CCol>
                    </CFormGroup>

                    <CFormGroup row>
                      <CCol xs="12" md="14">
                        <CLabel htmlFor="DS_RESUMO">Resumo</CLabel>
                        <CTextarea
                          id="DS_RESUMO"
                          name="DS_RESUMO"
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
                        <CLabel htmlFor="CD_STATUS">Status do Curso</CLabel>
                        <CSelect
                          id="CD_STATUS"
                          name="CD_STATUS"
                          value={values.CD_STATUS}
                          onBlur={handleBlur("CD_STATUS")}
                          onChange={handleChange("CD_STATUS")}
                          className={
                            touched.CD_STATUS && errors.CD_STATUS
                              ? "input-error"
                              : "none"
                          }
                          autoComplete="CD_STATUS"
                        >
                          <option value="0">
                            Por favor, seleccione um status
                          </option>
                          <option value="1">Activo</option>
                          <option value="2">Inactivo</option>
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
                        <CLabel htmlFor="nome">Certificado</CLabel>
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
                      </CCol>
                    </CFormGroup>

                    <br />
                    <h6>Upload da imagem de busca (img)</h6>
                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <div
                          style={{
                            border: "1px dotted dodgerblue",
                            padding: "1rem",
                          }}
                        >
                          <CLabel htmlFor="DS_TEXTO_IMAGEM1">
                            Descrição da imagem
                          </CLabel>
                          <CInput
                            id="DS_TEXTO_IMAGEM1"
                            name="DS_TEXTO_IMAGEM1"
                            value={values.DS_TEXTO_IMAGEM1}
                            onBlur={handleBlur("DS_TEXTO_IMAGEM1")}
                            onChange={handleChange("DS_TEXTO_IMAGEM1")}
                            className={
                              touched.DS_TEXTO_IMAGEM1 &&
                              errors.DS_TEXTO_IMAGEM1
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_TEXTO_IMAGEM1"
                          />
                          {touched.DS_TEXTO_IMAGEM1 &&
                          errors.DS_TEXTO_IMAGEM1 ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_TEXTO_IMAGEM1}
                            </div>
                          ) : null}

                          <div className="upload">
                            <div className="image">
                              <CImg
                                src={imgUrl1 ? imgUrl1 : UploadImg}
                                alt="mundo-nathy"
                                fluid
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <input
                              className="input-file"
                              type="file"
                              id="DS_LINK_IMAGEM1"
                              name="DS_LINK_IMAGEM1"
                              onChange={(e: any) => setFile1(e.target.files)}
                            />
                            <CCol
                              md
                              sm="12"
                              className="mb-sm-2 mb-0 d-md-down-none"
                            >
                              <strong>{percent1}%</strong>
                              <CProgress
                                className="progress-xs mt-2"
                                precision={1}
                                color="info"
                                value={percent1}
                              />
                            </CCol>

                            <CButton
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={handleUpload1}
                            >
                              <CIcon name="cil-scrubber" /> Upload
                            </CButton>

                            <CButton
                              className="btn-upload"
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={cancelUpload}
                            >
                              <CIcon name="cil-x" /> Cancelar
                            </CButton>
                          </div>
                        </div>
                      </CCol>
                    </CFormGroup>

                    <br />
                    <h6>Upload da imagem do fundo (img)</h6>
                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <div
                          style={{
                            border: "1px dotted dodgerblue",
                            padding: "1rem",
                          }}
                        >
                          <CLabel htmlFor="DS_TEXTO_IMAGEM2">
                            Descrição da imagem
                          </CLabel>
                          <CInput
                            id="DS_TEXTO_IMAGEM2"
                            name="DS_TEXTO_IMAGEM2"
                            value={values.DS_TEXTO_IMAGEM2}
                            onBlur={handleBlur("DS_TEXTO_IMAGEM2")}
                            onChange={handleChange("DS_TEXTO_IMAGEM2")}
                            className={
                              touched.DS_TEXTO_IMAGEM2 &&
                              errors.DS_TEXTO_IMAGEM2
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_TEXTO_IMAGEM2"
                          />
                          {touched.DS_TEXTO_IMAGEM2 &&
                          errors.DS_TEXTO_IMAGEM2 ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_TEXTO_IMAGEM2}
                            </div>
                          ) : null}

                          <div className="upload">
                            <div className="image">
                              <CImg
                                src={imgUrl2 ? imgUrl2 : UploadImg}
                                alt="mundo-nathy"
                                fluid
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <input
                              className="input-file"
                              type="file"
                              id="DS_LINK_IMAGEM2"
                              name="DS_LINK_IMAGEM2"
                              onChange={(e: any) => setFile2(e.target.files)}
                            />
                            <CCol
                              md
                              sm="12"
                              className="mb-sm-2 mb-0 d-md-down-none"
                            >
                              <strong>{percent2}%</strong>
                              <CProgress
                                className="progress-xs mt-2"
                                precision={1}
                                color="info"
                                value={percent2}
                              />
                            </CCol>

                            <CButton
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={handleUpload2}
                            >
                              <CIcon name="cil-scrubber" /> Upload
                            </CButton>

                            <CButton
                              className="btn-upload"
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={cancelUpload}
                            >
                              <CIcon name="cil-x" /> Cancelar
                            </CButton>
                          </div>
                        </div>
                      </CCol>
                    </CFormGroup>

                    <br />
                    <h6>Upload da imagem padrão (img)</h6>
                    <CFormGroup row>
                      <CCol xs="12" md="12">
                        <div
                          style={{
                            border: "1px dotted dodgerblue",
                            padding: "1rem",
                          }}
                        >
                          <CLabel htmlFor="DS_TEXTO_IMAGEM3">
                            Descrição da imagem
                          </CLabel>
                          <CInput
                            id="DS_TEXTO_IMAGEM3"
                            name="DS_TEXTO_IMAGEM3"
                            value={values.DS_TEXTO_IMAGEM3}
                            onBlur={handleBlur("DS_TEXTO_IMAGEM3")}
                            onChange={handleChange("DS_TEXTO_IMAGEM3")}
                            className={
                              touched.DS_TEXTO_IMAGEM3 &&
                              errors.DS_TEXTO_IMAGEM3
                                ? "input-error"
                                : "none"
                            }
                            autoComplete="DS_TEXTO_IMAGEM3"
                          />
                          {touched.DS_TEXTO_IMAGEM3 &&
                          errors.DS_TEXTO_IMAGEM3 ? (
                            <div className="errors">
                              <span className="icon">
                                <MdOutlineError />
                              </span>
                              {errors.DS_TEXTO_IMAGEM3}
                            </div>
                          ) : null}

                          <div className="upload">
                            <div className="image">
                              <CImg
                                src={imgUrl3 ? imgUrl3 : UploadImg}
                                alt="mundo-nathy"
                                fluid
                                style={{
                                  width: "100%",
                                  height: "100%",
                                }}
                              />
                            </div>
                            <input
                              className="input-file"
                              type="file"
                              id="DS_LINK_IMAGEM3"
                              name="DS_LINK_IMAGEM3"
                              onChange={(e: any) => setFile3(e.target.files)}
                            />
                            <CCol
                              md
                              sm="12"
                              className="mb-sm-2 mb-0 d-md-down-none"
                            >
                              <strong>{percent3}%</strong>
                              <CProgress
                                className="progress-xs mt-2"
                                precision={1}
                                color="info"
                                value={percent3}
                              />
                            </CCol>

                            <CButton
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={handleUpload3}
                            >
                              <CIcon name="cil-scrubber" /> Upload
                            </CButton>

                            <CButton
                              className="btn-upload"
                              type="submit"
                              size="sm"
                              color="info"
                              onClick={cancelUpload}
                            >
                              <CIcon name="cil-x" /> Cancelar
                            </CButton>
                          </div>
                        </div>
                      </CCol>
                    </CFormGroup>

                    <br />
                    <CButton
                      type="submit"
                      size="sm"
                      color="info"
                      onClick={() => handleCreateNewCourse(values)}
                    >
                      <CIcon name="cil-scrubber" /> Cadastrar Curso
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

export default AddCurso;
