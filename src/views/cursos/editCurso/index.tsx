import React, { FormEvent, useEffect, useState } from "react";
import { CursosProps } from "../type";
import CIcon from "@coreui/icons-react";
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
  CInputFile,
} from "@coreui/react";
import { useCurso } from "../../../hooks/useCurso";
import { useCertificado } from "src/hooks/useCertificado";
import api from "src/services/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";

const EditCurso: React.FC<CursosProps> = () => {
  const { updateCurso } = useCurso();
  const { certificado } = useCertificado();
  const history = useHistory();
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const [ID_CURSO, setID_CURSO] = useState("");
  const [DS_CURSO, setDS_CURSO] = useState("");
  const [DS_RESUMO, setDS_RESUMO] = useState("");
  const [DS_NOME_CURSO, setDS_NOME_CURSO] = useState("");
  const [ID_TIPO, setID_TIPO] = useState("0");
  const [ID_SUB_TIPO, setID_SUB_TIPO] = useState("0");
  const [CD_STATUS, setCD_STATUS] = useState("0");
  const [ID_CERTIFICADO, setID_CERTIFICADO] = useState("0");
  const [DS_TEXTO_IMAGEM1, setDS_TEXTO_IMAGEM1] = useState("");
  const [DS_TEXTO_IMAGEM2, setDS_TEXTO_IMAGEM2] = useState("");
  const [DS_TEXTO_IMAGEM3, setDS_TEXTO_IMAGEM3] = useState("");
  const [DS_LINK_IMAGEM1, setDS_LINK_IMAGEM1] = useState("");
  const [DS_LINK_IMAGEM2, setDS_LINK_IMAGEM2] = useState("");
  const [DS_LINK_IMAGEM3, setDS_LINK_IMAGEM3] = useState("");

  useEffect(() => {
    async function getCurso() {
      const ID_CURSO = localStorage.getItem("data-curso");
      await api
        .get(`/produto/curso/${ID_CURSO}`)
        .then((response) => response.data)
        .then((result) => {
          setID_CURSO(result[0].ID_CURSO);
          setDS_CURSO(result[0].DS_CURSO);
          setDS_NOME_CURSO(result[0].DS_NOME_CURSO);
          setDS_RESUMO(result[0].DS_RESUMO);
          setID_TIPO(result[0].ID_TIPO);
          setID_SUB_TIPO(result[0].ID_SUB_TIPO);
          setCD_STATUS(result[0].CD_STATUS);
          setID_CERTIFICADO(result[0].ID_CERTIFICADO);
          setDS_TEXTO_IMAGEM1(result[0].DS_TEXTO_IMAGEM1);
          setDS_TEXTO_IMAGEM2(result[0].DS_TEXTO_IMAGEM2);
          setDS_TEXTO_IMAGEM3(result[0].DS_TEXTO_IMAGEM3);
          setDS_LINK_IMAGEM1(result[0].DS_LINK_IMAGEM1);
          setDS_LINK_IMAGEM2(result[0].DS_LINK_IMAGEM2);
          setDS_LINK_IMAGEM3(result[0].DS_LINK_IMAGEM3);
          console.log(result);
        });
    }
    getCurso();
  }, []);

  async function handleUpdateCurso(event: FormEvent) {
    event.preventDefault();
    try {
      await updateCurso({
        ID_CURSO,
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
      });
      history.push("/curso/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
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
              Edita aqui os cursos
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
              <CFormGroup row>
                <CCol xs="12" md="12">
                  <CLabel htmlFor="ID_CURSO">Código</CLabel>
                  <CInput
                    id="ID_CURSO"
                    name="ID_CURSO"
                    autoComplete="ID_CURSO"
                    value={ID_CURSO}
                    onChange={(e) =>
                      setID_CURSO((e.target as HTMLInputElement).value)
                    }
                    required
                    disabled
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="ID_TIPO">Selecciona um tipo</CLabel>
                  <CSelect
                    id="ID_TIPO"
                    name="ID_TIPO"
                    autoComplete="ID_TIPO"
                    value={ID_TIPO}
                    onChange={(e) =>
                      setID_TIPO((e.target as HTMLInputElement).value)
                    }
                    required
                  >
                    <option value="0">Por favor, seleccione um tipo</option>
                    <option value="1">Curso</option>
                    <option value="2">Arquivos</option>
                    <option value="3">Assinaturas</option>
                  </CSelect>
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="ID_SUB_TIPO">Selecciona um subtipo</CLabel>
                  <CSelect
                    id="ID_SUB_TIPO"
                    name="ID_SUB_TIPO"
                    autoComplete="nome"
                    value={ID_SUB_TIPO}
                    onChange={(e) =>
                      setID_SUB_TIPO((e.target as HTMLInputElement).value)
                    }
                    required
                  >
                    <option value="0">Por favor, seleccione um tipo</option>
                    <option value="1">Corte e Costura</option>
                    <option value="2">Dermatologia</option>
                    <option value="3">Sobrancelhas</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="nome">Nome</CLabel>
                  <CInput
                    id="DS_NOME_CURSO"
                    name="DS_NOME_CURSO"
                    autoComplete="DS_NOME_CURSO"
                    value={DS_NOME_CURSO}
                    onChange={(e) =>
                      setDS_NOME_CURSO((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_CURSO">Descrição</CLabel>
                  <CInput
                    id="DS_CURSO"
                    name="DS_CURSO"
                    autoComplete="DS_CURSO"
                    value={DS_CURSO}
                    onChange={(e) =>
                      setDS_CURSO((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="14">
                  <CLabel htmlFor="DS_RESUMO">Resumo</CLabel>
                  <CTextarea
                    id="DS_RESUMO"
                    name="DS_RESUMO"
                    autoComplete="DS_RESUMO"
                    value={DS_RESUMO}
                    onChange={(e) =>
                      setDS_RESUMO((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="CD_STATUS">Status do Curso</CLabel>
                  <CSelect
                    id="CD_STATUS"
                    name="CD_STATUS"
                    autoComplete="CD_STATUS"
                    value={CD_STATUS}
                    onChange={(e) =>
                      setCD_STATUS((e.target as HTMLInputElement).value)
                    }
                    required
                  >
                    <option value="0">Por favor, seleccione um status</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </CSelect>
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="ID_CERTIFICADO">Certificado</CLabel>
                  <CSelect
                    id="ID_CERTIFICADO"
                    name="ID_CERTIFICADO"
                    value={ID_CERTIFICADO}
                    onChange={(e) =>
                      setID_CERTIFICADO((e.target as HTMLInputElement).value)
                    }
                  >
                    <option>Por favor, seleccione um certificado</option>
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

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_TEXTO_IMAGEM1">
                    Descrição da Imagem 1
                  </CLabel>
                  <CInput
                    id="DS_TEXTO_IMAGEM1"
                    name="DS_TEXTO_IMAGEM1"
                    autoComplete="DS_TEXTO_IMAGEM1"
                    value={DS_TEXTO_IMAGEM1}
                    onChange={(e) =>
                      setDS_TEXTO_IMAGEM1((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_LINK_IMAGEM1">Carregar imagem</CLabel>
                  <CInputFile
                    id="DS_LINK_IMAGEM1"
                    name="DS_LINK_IMAGEM1"
                    autoComplete="DS_LINK_IMAGEM1"
                    //value={DS_TEXTO_IMAGEM1}
                    onChange={(e) =>
                      setDS_LINK_IMAGEM1((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_TEXTO_IMAGEM2">
                    Descrição da Imagem 2
                  </CLabel>
                  <CInput
                    id="DS_TEXTO_IMAGEM2"
                    name="DS_TEXTO_IMAGEM2"
                    autoComplete="DS_TEXTO_IMAGEM2"
                    value={DS_TEXTO_IMAGEM2}
                    onChange={(e) =>
                      setDS_TEXTO_IMAGEM2((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_LINK_IMAGEM2">Carregar imagem</CLabel>
                  <CInputFile
                    id="DS_LINK_IMAGEM2"
                    name="DS_LINK_IMAGEM2"
                    autoComplete="DS_LINK_IMAGEM2"
                    //value={DS_TEXTO_IMAGEM2}
                    onChange={(e) => setDS_LINK_IMAGEM2(e.currentTarget.file)}
                    required
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_TEXTO_IMAGEM3">
                    Descrição da Imagem 3
                  </CLabel>
                  <CInput
                    id="DS_TEXTO_IMAGEM3"
                    name="DS_TEXTO_IMAGEM3"
                    autoComplete="DS_TEXTO_IMAGEM3"
                    value={DS_TEXTO_IMAGEM3}
                    onChange={(e) =>
                      setDS_TEXTO_IMAGEM3((e.target as HTMLInputElement).value)
                    }
                    required
                  />
                </CCol>

                <CCol xs="12" md="6">
                  <CLabel htmlFor="DS_LINK_IMAGEM3">Carregar imagem</CLabel>
                  <CInputFile
                    id="DS_LINK_IMAGEM3"
                    name="DS_LINK_IMAGEM3"
                    autoComplete="DS_LINK_IMAGEM3"
                    //value={DS_TEXTO_IMAGEM3}
                    onChange={(e) => setDS_LINK_IMAGEM3(e.currentTarget.file)}
                    required
                  />
                </CCol>
              </CFormGroup>

              <br />
              <CButton
                type="submit"
                size="sm"
                color="info"
                onClick={handleUpdateCurso}
              >
                <CIcon name="cil-scrubber" /> Editar
              </CButton>
            </CCardBody>
          </CCard>
        </CFade>
      </CCol>
    </CRow>
  );
};

export default EditCurso;
