import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Administração",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Usuários",
    route: "/gAdmin",
    icon: "cil-people",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Alunos",
        to: "/users/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Páginas",
    route: "/gAdmin",
    icon: "cil-notes",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Menu Itens",
        to: "/menuItem/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Produtos",
    route: "",
    icon: "cil-layers",
    _children: [
      {
        _tag: "CSidebarNavItem",
        name: "Cursos",
        to: "/curso/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Módulos",
        to: "/modulo/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Aulas",
        to: "/aula/list",
      },
      {
        _tag: "CSidebarNavItem",
        name: "Arquivos",
        to: "/arquivo/list",
      },
    ],
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Provas",
    route: "",
    icon: "cil-people",
  },

  {
    _tag: "CSidebarNavDropdown",
    name: "Certificados",
    route: "",
    icon: "cil-people",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Ranking",
    to: "/products/list",
    icon: "cil-calculator",
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  {
    _tag: "CSidebarNavItem",
    name: "Configurações",
    to: "/relatorios",
    icon: "cil-settings",
  },

  {
    _tag: "CSidebarNavItem",
    name: "Perfil",
    to: "/profile/list",
    icon: "cil-user",
  },

  {
    _tag: "CSidebarNavTitle",
    _children: ["Autenticação"],
  },

  {
    _tag: "CSidebarNavItem",
    name: "Sair da Conta",
    to: "",
    icon: "cil-user",
  },
];

export default _nav;
