import React, { FormEvent, useEffect, useState } from "react";
import { AulasProps } from "../type";
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
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { useAula } from "src/hooks/useAula";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { useModulo } from "src/hooks/useModulo";
import api from "src/services/api";

const EditAulas: React.FC<AulasProps> = () => {
  const [collapsed, setCollapsed] = React.useState(true);
  //eslint-disable-next-line
  const [showElements, setShowElements] = React.useState(true);
  const history = useHistory();
  const { updateAula } = useAula();
  const { modulo } = useModulo();
  const [ID_MODULO_AULA, setID_MODULO_AULA] = useState("");
  const [ID_MODULO, setID_MODULO] = useState("");
  const [VL_CONSIDERAR_COMPLETA, setVL_CONSIDERAR_COMPLETA] = useState("0");
  const [CD_ORDENACAO, setCD_ORDENACAO] = useState("0");
  const [DS_DESCRICAO, setDS_DESCRICAO] = useState("");
  const [DS_RESUMO, setDS_RESUMO] = useState("");
  const [CD_STATUS, setCD_STATUS] = useState("0");
  const [VL_ATUAL, setVL_ATUAL] = useState("0");

  useEffect(() => {
    async function getAula() {
      const ID_MODULO_AULA = localStorage.getItem("data-aula");
      await api
        .get(`/produto/moduloaula/${ID_MODULO_AULA}`)
        .then((response) => response.data)
        .then((result) => {
          setID_MODULO_AULA(result[0].ID_MODULO_AULA);
          setID_MODULO(result[0].ID_MODULO);
          setVL_CONSIDERAR_COMPLETA(result[0].VL_CONSIDERAR_COMPLETA);
          setCD_ORDENACAO(result[0].CD_ORDENACAO);
          setDS_DESCRICAO(result[0].DS_DESCRICAO);
          setDS_RESUMO(result[0].DS_RESUMO);
          setCD_STATUS(result[0].CD_STATUS);
          setVL_ATUAL(result[0].VL_ATUAL);

          console.log(result);
        });
    }
    getAula();
  }, []);

  async function handleUpdateAula(event: FormEvent) {
    event.preventDefault();
    try {
      await updateAula({
        ID_MODULO_AULA,
        ID_MODULO,
        VL_CONSIDERAR_COMPLETA,
        CD_ORDENACAO,
        DS_DESCRICAO,
        DS_RESUMO,
        CD_STATUS,
        VL_ATUAL,
      });
      history.push("/aula/list");
    } catch (err) {
      const error = err as AxiosError;
      Swal.fire("Ops!", "Ocorreu um erro, tente novamente.", "error");
      console.log(error);
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
                Edita aqui as aulas
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
                    <CLabel htmlFor="ID_MODULO_AULA">Código</CLabel>
                    <CInput
                      id="ID_MODULO_AULA"
                      name="ID_MODULO_AULA"
                      autoComplete="ID_MODULO_AULA"
                      value={ID_MODULO_AULA}
                      onChange={(e) =>
                        setID_MODULO_AULA((e.target as HTMLInputElement).value)
                      }
                      required
                      disabled
                    />
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CCol xs="12" md="6">
                    <CLabel htmlFor="ID_MODULO">Escolha um módulo</CLabel>
                    <CSelect
                      id="ID_MODULO"
                      name="ID_MODULO"
                      autoComplete="ID_MODULO"
                      value={ID_MODULO}
                      onChange={(e) =>
                        setID_MODULO((e.target as HTMLInputElement).value)
                      }
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
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="descricao">Descrição</CLabel>
                    <CInput
                      id="DS_DESCRICAO"
                      name="DS_DESCRICAO"
                      autoComplete="DS_DESCRICAO"
                      value={DS_DESCRICAO}
                      onChange={(e) =>
                        setDS_DESCRICAO((e.target as HTMLInputElement).value)
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
                    <CLabel htmlFor="CD_ORDENACAO">Ordenação</CLabel>
                    <CInput
                      type="number"
                      id="CD_ORDENACAO"
                      name="CD_ORDENACAO"
                      autoComplete="CD_ORDENACAO"
                      value={CD_ORDENACAO}
                      onChange={(e) =>
                        setCD_ORDENACAO((e.target as HTMLInputElement).value)
                      }
                    />
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="VL_CONSIDERAR_COMPLETA">
                      Considerar Completa?
                    </CLabel>
                    <CSelect
                      id="VL_CONSIDERAR_COMPLETA"
                      name="VL_CONSIDERAR_COMPLETA"
                      autoComplete="VL_CONSIDERAR_COMPLETA"
                      value={VL_CONSIDERAR_COMPLETA}
                      onChange={(e) =>
                        setVL_CONSIDERAR_COMPLETA(
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
                    <CLabel htmlFor="CD_STATUS">Status</CLabel>
                    <CSelect
                      id="CD_STATUS"
                      name="CD_STATUS"
                      autoComplete="CD_STATUS"
                      value={CD_STATUS}
                      onChange={(e) =>
                        setCD_STATUS((e.target as HTMLInputElement).value)
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Inativo</option>

                      <option value="1">Activo</option>
                    </CSelect>
                  </CCol>

                  <CCol xs="12" md="6">
                    <CLabel htmlFor="VL_ATUAL">
                      Valor Actual de Conclusão
                    </CLabel>
                    <CSelect
                      id="VL_ATUAL"
                      name="VL_ATUAL"
                      autoComplete="VL_ATUAL"
                      value={VL_ATUAL}
                      onChange={(e) =>
                        setCD_STATUS((e.target as HTMLInputElement).value)
                      }
                    >
                      <option>Por favor, seleccione uma opção</option>

                      <option value="0">Concluída</option>

                      <option value="1">Não Concluída</option>
                    </CSelect>
                  </CCol>
                </CFormGroup>

                <br />
                <CButton
                  type="submit"
                  size="sm"
                  color="info"
                  onClick={handleUpdateAula}
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

export default EditAulas;
