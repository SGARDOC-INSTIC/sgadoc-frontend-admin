import React, { FormEvent, useEffect, useState } from "react";
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
  CInputFile,
  CLabel,
  CRow,
  CSelect,
  CTextarea,
} from "@coreui/react";
import { ModulosProps } from "../type";
import { useCertificado } from "src/hooks/useCertificado";
import { useModulo } from "src/hooks/useModulo";
import { useCurso } from "src/hooks/useCurso";
import api from "src/services/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useHistory } from "react-router-dom";

const EditModulo: React.FC<ModulosProps> = (data) => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const [ID_MODULO, setID_MODULO] = useState("");
  const [DS_MODULO, setDS_MODULO] = useState("");
  const [DS_DESCRICAO_DETALHADA, setDS_DESCRICAO_DETALHADA] = useState("");
  const [DS_RESUMO, setDS_RESUMO] = useState("");
  const [CD_ORDENACAO, setCD_ORDENACAO] = useState("0");
  const [CD_REQUER_CONCLUSAO_ANTERIOR, setCD_REQUER_CONCLUSAO_ANTERIOR] =
    useState("0");
  const [CD_PROVA_AO_FINAL, setCD_PROVA_AO_FINAL] = useState("0");
  const [
    VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO,
    setVL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO,
  ] = useState("");
  const [VL_NOTA_MINIMA_CONCLUIR, setVL_NOTA_MINIMA_CONCLUIR] = useState("0");
  const [DS_LINK_IMAGEM, setDS_LINK_IMAGEM] = useState("");
  const [DS_TEXTO_IMAGEM, setDS_TEXTO_IMAGEM] = useState("");
  const [NR_DIAS_PARA_CONCLUIR, setNR_DIAS_PARA_CONCLUIR] = useState("0");
  const [NR_TENTATIVAS_MAX_PROVA, setNR_TENTATIVAS_MAX_PROVA] = useState("0");
  const [VL_CARGA_HORARIA, setVL_CARGA_HORARIA] = useState("0");
  const [ID_CERTIFICADO, setID_CERTIFICADO] = useState("0");
  const [ID_CURSO, setID_CURSO] = useState("0");

  const { updateModulo } = useModulo();
  const { curso } = useCurso();
  const { certificado } = useCertificado();
  const history = useHistory();

  useEffect(() => {
    async function getModulo() {
      const ID_MODULO = localStorage.getItem("data-modulo");
      await api
        .get(`/produto/modulo/${ID_MODULO}`)
        .then((response) => response.data)
        .then((result) => {
          setID_MODULO(result[0].ID_MODULO);
          setID_CURSO(result[0].ID_CURSO);
          setDS_MODULO(result[0].DS_MODULO);
          setDS_RESUMO(result[0].DS_RESUMO);
          setDS_DESCRICAO_DETALHADA(result[0].DS_DESCRICAO_DETALHADA);
          setCD_ORDENACAO(result[0].CD_ORDENACAO);
          setCD_REQUER_CONCLUSAO_ANTERIOR(
            result[0].CD_REQUER_CONCLUSAO_ANTERIOR
          );
          setCD_PROVA_AO_FINAL(result[0].CD_PROVA_AO_FINAL);
          setID_CERTIFICADO(result[0].ID_CERTIFICADO);
          setVL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO(
            result[0].VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO
          );
          setVL_NOTA_MINIMA_CONCLUIR(result[0].VL_NOTA_MINIMA_CONCLUIR);
          setDS_LINK_IMAGEM(result[0].DS_LINK_IMAGEM);
          setDS_TEXTO_IMAGEM(result[0].DS_TEXTO_IMAGEM);
          setNR_DIAS_PARA_CONCLUIR(result[0].NR_DIAS_PARA_CONCLUIR);
          setNR_TENTATIVAS_MAX_PROVA(result[0].NR_TENTATIVAS_MAX_PROVA);
          setVL_CARGA_HORARIA(result[0].VL_CARGA_HORARIA);
          console.log(result);
        });
    }
    getModulo();
  }, []);

  async function handleUpdateModule(event: FormEvent) {
    event.preventDefault();
    try {
      await updateModulo({
        ID_MODULO,
        DS_MODULO,
        DS_RESUMO,
        DS_DESCRICAO_DETALHADA,
        CD_ORDENACAO,
        CD_REQUER_CONCLUSAO_ANTERIOR,
        CD_PROVA_AO_FINAL,
        VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO,
        VL_NOTA_MINIMA_CONCLUIR,
        DS_LINK_IMAGEM,
        DS_TEXTO_IMAGEM,
        NR_DIAS_PARA_CONCLUIR,
        NR_TENTATIVAS_MAX_PROVA,
        VL_CARGA_HORARIA,
        ID_CERTIFICADO,
        ID_CURSO,
      });
      history.push("/modulo/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", error.message, "error");
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
                <CFormGroup row>
                  <CCol xs="12" md="12">
                    <CLabel htmlFor="ID_MODULO">Código</CLabel>
                    <CInput
                      id="ID_MODULO"
                      name="ID_MODULO"
                      value={ID_MODULO}
                      onChange={(e) =>
                        setID_MODULO((e.target as HTMLInputElement).value)
                      }
                      disabled
                      autoComplete="ID_MODULO"
                    />
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="curso">Escolha um curso</CLabel>
                    <CSelect
                      id="ID_CURSO"
                      name="ID_CURSO"
                      value={ID_CURSO}
                      onChange={(e) =>
                        setID_CURSO((e.target as HTMLInputElement).value)
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>
                      {curso.map((item: any) => {
                        return (
                          <option value={item.ID_CURSO}>{item.DS_CURSO}</option>
                        );
                      })}
                    </CSelect>
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_MODULO">Nome do Módulo</CLabel>
                    <CInput
                      id="DS_MODULO"
                      name="DS_MODULO"
                      value={DS_MODULO}
                      onChange={(e) =>
                        setDS_MODULO((e.target as HTMLInputElement).value)
                      }
                      autoComplete="DS_MODULO"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_DESCRICAO_DETALHADA">Descrição</CLabel>
                    <CInput
                      id="DS_DESCRICAO_DETALHADA"
                      name="DS_DESCRICAO_DETALHADA"
                      value={DS_DESCRICAO_DETALHADA}
                      onChange={(e) =>
                        setDS_DESCRICAO_DETALHADA(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="DS_DESCRICAO_DETALHADA"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="CD_ORDENACAO">Ordenação</CLabel>
                    <CInput
                      type="number"
                      id="CD_ORDENACAO"
                      name="CD_ORDENACAO"
                      value={CD_ORDENACAO}
                      onChange={(e) =>
                        setCD_ORDENACAO((e.target as HTMLInputElement).value)
                      }
                      autoComplete="CD_ORDENACAO"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="14">
                    <CLabel htmlFor="DS_RESUMO">Resumo</CLabel>
                    <CTextarea
                      id="DS_RESUMO"
                      name="DS_RESUMO"
                      value={DS_RESUMO}
                      onChange={(e) =>
                        setDS_RESUMO((e.target as HTMLInputElement).value)
                      }
                      autoComplete="DS_RESUMO"
                    />
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
                      value={DS_TEXTO_IMAGEM}
                      onChange={(e) =>
                        setDS_TEXTO_IMAGEM((e.target as HTMLInputElement).value)
                      }
                      autoComplete="DS_TEXTO_IMAGEM"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="DS_LINK_IMAGEM">Carregar imagem</CLabel>
                    <CInputFile
                      type="file"
                      id="DS_LINK_IMAGEM"
                      name="DS_LINK_IMAGEM"
                      label="Default file input example"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO">
                      Percentagem de Conclusão
                    </CLabel>
                    <CInput
                      type="number"
                      id="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                      name="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                      value={VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO}
                      onChange={(e) =>
                        setVL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="VL_LIBERAR_PROVA_PORCENTAGEM_CONCLUSAO"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="VL_NOTA_MINIMA_CONCLUIR">
                      Nota Mínima Para Concluir
                    </CLabel>
                    <CInput
                      type="number"
                      id="VL_NOTA_MINIMA_CONCLUIR"
                      name="VL_NOTA_MINIMA_CONCLUIR"
                      value={VL_NOTA_MINIMA_CONCLUIR}
                      onChange={(e) =>
                        setVL_NOTA_MINIMA_CONCLUIR(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="VL_NOTA_MINIMA_CONCLUIR"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="image">Carga Horária</CLabel>
                    <CInput
                      type="number"
                      id="VL_CARGA_HORARIA"
                      name="VL_CARGA_HORARIA"
                      value={VL_CARGA_HORARIA}
                      onChange={(e) =>
                        setVL_CARGA_HORARIA(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="VL_CARGA_HORARIA"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="NR_DIAS_PARA_CONCLUIR">
                      Dias Para Concluir
                    </CLabel>
                    <CInput
                      type="number"
                      id="NR_DIAS_PARA_CONCLUIR"
                      name="NR_DIAS_PARA_CONCLUIR"
                      value={NR_DIAS_PARA_CONCLUIR}
                      onChange={(e) =>
                        setNR_DIAS_PARA_CONCLUIR(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="NR_DIAS_PARA_CONCLUIR"
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="NR_TENTATIVAS_MAX_PROVA">
                      Tentativas Máxima Para Prova
                    </CLabel>
                    <CInput
                      type="number"
                      id="NR_TENTATIVAS_MAX_PROVA"
                      name="NR_TENTATIVAS_MAX_PROVA"
                      value={NR_TENTATIVAS_MAX_PROVA}
                      onChange={(e) =>
                        setNR_TENTATIVAS_MAX_PROVA(
                          (e.target as HTMLInputElement).value
                        )
                      }
                      autoComplete="NR_TENTATIVAS_MAX_PROVA"
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="CD_PROVA_AO_FINAL">Prova Final</CLabel>
                    <CSelect
                      id="CD_PROVA_AO_FINAL"
                      name="CD_PROVA_AO_FINAL"
                      value={CD_PROVA_AO_FINAL}
                      onChange={(e) =>
                        setCD_PROVA_AO_FINAL(
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Não</option>

                      <option value="1">Sim</option>
                    </CSelect>
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
                      value={CD_REQUER_CONCLUSAO_ANTERIOR}
                      onChange={(e) =>
                        setCD_REQUER_CONCLUSAO_ANTERIOR(
                          (e.target as HTMLInputElement).value
                        )
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Não</option>

                      <option value="1">Sim</option>
                    </CSelect>
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="image">Certificado</CLabel>
                    <CSelect
                      id="ID_CERTIFICADO"
                      name="ID_CERTIFICADO"
                      value={ID_CERTIFICADO}
                      onChange={(e) =>
                        setID_CERTIFICADO((e.target as HTMLInputElement).value)
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
                <CButton
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={handleUpdateModule}
                >
                  <CIcon name="cil-scrubber" /> Editar
                </CButton>
              </CCardBody>
            </CCard>
          </CFade>
        </CCol>
      </CRow>
    </>
  );
};

export default EditModulo;
