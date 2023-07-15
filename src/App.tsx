import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import ConfigRoutes from "./views/pages/config/routes";
import GlobalStyles from "./global";
import { CursosProvider } from "./hooks/useCurso";
import { ModulosProvider } from "./hooks/useModulo";
import { AulaProvider } from "./hooks/useAula";
import { CertificadoProvider } from "./hooks/useCertificado";
import { ModulosCursoProvider } from "./hooks/useModuloCurso";
import { UsersProvider } from "./hooks/useUsers";
import { MenuProvider } from "./hooks/useMenu";
import { ArquivosProvider } from "./hooks/useArquivo";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./google-fonts.css";
import "./scss/style.scss";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages

const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));

const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <MenuProvider>
          <UsersProvider>
            <CertificadoProvider>
              <CursosProvider>
                <ModulosProvider>
                  <ModulosCursoProvider>
                    <AulaProvider>
                      <ArquivosProvider>
                        <HashRouter>
                          <React.Suspense fallback={loading}>
                            <Switch>
                              <Route path="/config" component={ConfigRoutes} />
                              <Route exact path="/login" component={Login} />
                              <Route
                                exact
                                path="/register"
                                component={Register}
                              />
                              <Route exact path="/404" component={Page404} />
                              <Route exact path="/500" component={Page500} />
                              <Route path="/" component={TheLayout} />
                            </Switch>
                          </React.Suspense>
                        </HashRouter>
                      </ArquivosProvider>
                    </AulaProvider>
                  </ModulosCursoProvider>
                </ModulosProvider>
              </CursosProvider>
            </CertificadoProvider>
          </UsersProvider>
        </MenuProvider>
      </>
    );
  }
}

export default App;
