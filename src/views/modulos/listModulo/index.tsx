import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PSTable } from "src/shared/components/Table/index";
import { CButton, CCollapse, CCardBody } from "@coreui/react";
import { modulosTableFields } from "./tableSettins/fields";
import { ModulosProps } from "../type";
import { useModulo } from "../../../hooks/useModulo";
import { AulasProps } from "src/views/aulas/type";

const ListModulos: React.FC<ModulosProps> = () => {
  const [details, setDetails] = useState<any[]>([]);
  const { modulo, deleteModulo } = useModulo();
  const history = useHistory();

  async function update({ ID_MODULO }: ModulosProps) {
    localStorage.setItem("data-modulo", ID_MODULO);
    history.push(`/modulo/edit/${ID_MODULO}`);
  }

  async function handleDelete(data: ModulosProps) {
    await deleteModulo(data);
    history.push("/modulo/list");
  }

  async function aulasList({ ID_MODULO }: AulasProps) {
    localStorage.setItem("aula-modulo", ID_MODULO);
    history.push(`/aula/list/${ID_MODULO}`);
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
        title="Módulos Cadastrados"
        data={modulo}
        loading={false}
        fields={modulosTableFields}
        itemsPerPage={5}
        linkAddNewRow="/modulo/add"
        scopedSlots={{
          actions: (item: any) => {
            return (
              <td>
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => {
                    toggleDetails(item.ID_MODULO);
                  }}
                >
                  {details.includes(item.ID_MODULO) ? "Ocultar" : "Mostrar"}
                </CButton>
              </td>
            );
          },
          details: (item: any) => {
            return (
              <CCollapse show={details.includes(item.ID_MODULO)}>
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
                  <CButton size="sm" color="info" className="ml-1">
                    Mais Detalhes
                  </CButton>
                  <CButton
                    size="sm"
                    color="success"
                    className="ml-1"
                    onClick={() => aulasList(item)}
                  >
                    Ver Todas as Aulas
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

export default ListModulos;
