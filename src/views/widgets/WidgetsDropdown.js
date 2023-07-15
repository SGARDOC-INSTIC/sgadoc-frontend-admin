import React from "react";
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CLink,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ChartLineSimple from "../charts/ChartLineSimple";
import ChartBarSimple from "../charts/ChartBarSimple";
import { useUser } from "src/hooks/useUsers";
import { useCurso } from "src/hooks/useCurso";
import { useMenu } from "src/hooks/useMenu";
import { useCertificado } from "src/hooks/useCertificado";
const WidgetsDropdown = () => {
  const { user } = useUser();
  const { curso } = useCurso();
  const { menu } = useMenu();
  const { certificado } = useCertificado();

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={user.length}
          text="Usuários"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[20, 10, 15, 6, 19, 20, 18]}
              pointHoverBackgroundColor="primary"
              label="Usuários"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Ver</CDropdownItem>
              <CDropdownItem>Adicionar</CDropdownItem>
              <CDropdownItem>Estatísticas</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={curso.length}
          text="Cursos"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              dataPoints={[5, 4, 5, 5, 3, 5, 5]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 } } }}
              label="Produtos"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret={false} color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Ver</CDropdownItem>
              <CDropdownItem>Adicionar</CDropdownItem>
              <CDropdownItem>Estatísticas</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={menu.length}
          text="Menu Itens"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{ height: "70px" }}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[15, 5, 7, 15, 10, 12, 14]}
              options={{ elements: { line: { borderWidth: 2.5 } } }}
              pointHoverBackgroundColor="warning"
              label="Provas"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>
                <CLink href="/treatments/list" target="_blank">
                  Ver
                </CLink>
              </CDropdownItem>
              <CDropdownItem>Adicionar</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={certificado.length}
          text="Certificados"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{ height: "70px" }}
              backgroundColor="rgb(250, 152, 152)"
              label="Ranking"
              labels="months"
            />
          }
        >
          <CDropdown>
            <CDropdownToggle caret className="text-white" color="transparent">
              <CIcon name="cil-settings" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownItem>Ver</CDropdownItem>
              <CDropdownItem>Adicionar</CDropdownItem>
              <CDropdownItem disabled>Estatísticas</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
