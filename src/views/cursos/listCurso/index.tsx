import React, { useState } from "react";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { cursosTableFields } from "./tableSettins/fields";
import { CursosProps } from "../type";
import { useCurso } from "../../../hooks/useCurso";
import { useHistory } from "react-router-dom";

const ListCursos: React.FC<CursosProps> = () => {
  const { curso, deleteCurso } = useCurso();
  const [details, setDetails] = useState<any[]>([]);
  const history = useHistory();

  async function update({ ID_CURSO }: CursosProps) {
    localStorage.setItem("data-curso", ID_CURSO);
    history.push(`/curso/edit/${ID_CURSO}`);
  }

  async function handleDelete(data: CursosProps) {
    await deleteCurso(data);
    history.push("/curso/list");
  }

  async function modulosList({ ID_CURSO }: CursosProps) {
    localStorage.setItem("data-modulo-list", ID_CURSO);
    history.push(`/modulo-curso/list/${ID_CURSO}`);
  }

  const toggleDetails = (index: any) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };
  return (
    <>
      <PSTable
        title="Cursos Cadastrados"
        data={curso}
        loading={false}
        fields={cursosTableFields}
        itemsPerPage={5}
        linkAddNewRow="/curso/add"
        scopedSlots={{
          actions: (item: any) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    toggleDetails(item.ID_CURSO);
                  }}
                >
                  {details.includes(item.ID_CURSO) ? "Ocultar" : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.ID_CURSO)}>
                <CCardBody>
                  <p className="text-muted">
                    Criado (a) desde: {item.createdAt}
                  </p>

                  <CButton
                    size="sm"
                    color="warning"
                    onClick={() => update(item)}
                  >
                    Editar
                  </CButton>
                  <CButton
                    size="sm"
                    color="danger"
                    className="ml-1"
                    onClick={() => handleDelete(item)}
                  >
                    Apagar
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() => modulosList(item)}
                  >
                    Ver Todos Módulos
                  </CButton>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </>
  );
};

export default ListCursos;
