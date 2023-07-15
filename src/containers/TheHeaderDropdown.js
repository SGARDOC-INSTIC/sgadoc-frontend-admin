import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src="https://coreui.io/react/demo/4.0/free/static/media/4.3ddf28ab.jpg"
            className="c-avatar-img"
            alt="admin@zuri-box.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Minha Conta</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Actualizações
          <CBadge color="info" className="mfs-auto">
            2
          </CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tarefas
          <CBadge color="danger" className="mfs-auto">
            5
          </CBadge>
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Configurações</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />
          Meu perfil
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-settings" className="mfe-2" />
          Definições
        </CDropdownItem>

        <CDropdownItem divider />

        <CDropdownItem>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Bloquear Conta
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
