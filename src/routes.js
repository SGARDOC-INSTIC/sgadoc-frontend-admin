import Charts from "./views/charts/Charts";
import Dashboard from "./views/dashboard/Dashboard";
import {
  ListUsers,
  AddUsers,
  EditUsers,
  MoreDetailsUsers,
} from "./views/users";
import { ListMenuItem, AddMenuItem, EditMenuItem } from "./views/menuItems";
import { ListCurso, AddCurso, EditCurso } from "./views/cursos";
import { ListModulo, AddModulo, EditModulo } from "./views/modulos";
import {
  ListModuloCurso,
  AddModuloCurso,
  EditModuloCurso,
} from "./views/modulo-curso";
import { ListAula, AddAula, EditAula } from "./views/aulas";
import { ListArquivo, AddArquivo, EditArquivo } from "./views/arquivos";

import Estatisticas from "./views/estatisticas";
import { ListProfile, EditProfile } from "./views/profile/index";
import ListProfilePhotos from "./views/profile/listProfile/listProfilePhotos";
import ListProfileGeneral from "./views/profile/listProfile/listProfileGeneral";

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/charts", name: "Charts", component: Charts },

  //User
  { path: "/users/list", name: "Users", component: ListUsers },
  { path: "/users/add", name: "Users", component: AddUsers },
  { path: "/users/edit", name: "Users", component: EditUsers },
  { path: "/users/details", name: "Users", component: MoreDetailsUsers },

  //Menu
  { path: "/menuItem/list", name: "menuItem", component: ListMenuItem },
  { path: "/menuItem/add", name: "menuItem", component: AddMenuItem },
  { path: "/menuItem/edit", name: "menuItem", component: EditMenuItem },

  //Curso
  { path: "/curso/list", name: "curso", component: ListCurso },
  { path: "/curso/list/:id", name: "curso", component: ListCurso },
  { path: "/curso/add", name: "curso", component: AddCurso },
  { path: "/curso/edit/:id", name: "curso", component: EditCurso },

  //Modulo
  { path: "/modulo/list", name: "modulo", component: ListModulo },
  { path: "/modulo/add", name: "modulo", component: AddModulo },
  { path: "/modulo/edit/:id", name: "modulo", component: EditModulo },

  //Modulo-Curso
  {
    path: "/modulo-curso/list/:id",
    name: "modulo-curso",
    component: ListModuloCurso,
  },
  {
    path: "/modulo-curso/add",
    name: "modulo-curso",
    component: AddModuloCurso,
  },
  {
    path: "/modulo-curso/edit",
    name: "modulo-curso",
    component: EditModuloCurso,
  },

  //Aula
  { path: "/aula/list", name: "aula", component: ListAula },
  { path: "/aula/list/:id", name: "aula", component: ListAula },
  { path: "/aula/add", name: "aula", component: AddAula },
  { path: "/aula/edit/:id", name: "aula", component: EditAula },

  //Arquivo
  { path: "/arquivo/list", name: "arquivo", component: ListArquivo },
  { path: "/arquivo/add", name: "arquivo", component: AddArquivo },
  { path: "/arquivo/edit/:id", name: "arquivo", component: EditArquivo },

  { path: "/estatisticas", name: "Estatisticas", component: Estatisticas },

  //Stock
  { path: "/profile/list", name: "Profile", component: ListProfile },
  { path: "/profile/edit", name: "Profile", component: EditProfile },
  {
    path: "/profile/listProfilePhotos",
    name: "Profile",
    component: ListProfilePhotos,
  },
  {
    path: "/profile/listProfileGeneral",
    name: "Profile",
    component: ListProfileGeneral,
  },
];

export default routes;
