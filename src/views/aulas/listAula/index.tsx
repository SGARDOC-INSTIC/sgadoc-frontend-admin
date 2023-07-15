import React, { useState } from "react";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { aulasTableFields } from "./tableSettins/fields";
import { AulasProps } from "../type";
import { useAula } from "src/hooks/useAula";
import { useHistory } from "react-router-dom";

const ListAulas: React.FC<AulasProps> = () => {
  const [details, setDetails] = useState<any[]>([]);
  const { aulall, deleteAula } = useAula();
  const history = useHistory();

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

  async function update({ ID_MODULO_AULA }: AulasProps) {
    localStorage.setItem("data-aula", ID_MODULO_AULA);
    history.push(`/aula/edit/${ID_MODULO_AULA}`);
  }

  async function handleDelete(data: AulasProps) {
    await deleteAula(data);
    history.push("/aula/list");
  }

  return (
    <>
      <PSTable
        title="Aulas Cadastradas"
        data={aulall}
        loading={false}
        fields={aulasTableFields}
        itemsPerPage={5}
        linkAddNewRow="/aula/add"
        scopedSlots={{
          actions: (item: any) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    toggleDetails(item.ID_MODULO_AULA);
                  }}
                >
                  {details.includes(item.ID_MODULO_AULA)
                    ? "Ocultar"
                    : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.ID_MODULO_AULA)}>
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
                  <CButton size="sm" color="success" className="ml-1">
                    Ver Todos Arquivos
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

export default ListAulas;
