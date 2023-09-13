import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { ProfileList } from "./profile/ProfileList";
import { ProfileCreate } from "./profile/ProfileCreate";
import { ProfileEdit } from "./profile/ProfileEdit";
import { ProfileShow } from "./profile/ProfileShow";
import { OrderList } from "./order/OrderList";
import { OrderCreate } from "./order/OrderCreate";
import { OrderEdit } from "./order/OrderEdit";
import { OrderShow } from "./order/OrderShow";
import { OrganizationList } from "./organization/OrganizationList";
import { OrganizationCreate } from "./organization/OrganizationCreate";
import { OrganizationEdit } from "./organization/OrganizationEdit";
import { OrganizationShow } from "./organization/OrganizationShow";
import { CustomerList } from "./customer/CustomerList";
import { CustomerCreate } from "./customer/CustomerCreate";
import { CustomerEdit } from "./customer/CustomerEdit";
import { CustomerShow } from "./customer/CustomerShow";
import { EmptyList } from "./empty/EmptyList";
import { EmptyCreate } from "./empty/EmptyCreate";
import { EmptyEdit } from "./empty/EmptyEdit";
import { EmptyShow } from "./empty/EmptyShow";
import { Auth0AuthProvider } from "./auth-provider/ra-auth-auth0";
import { createBrowserHistory as createHistory } from "history";
import { BrowserRouter } from "react-router-dom";

const history = createHistory();

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Admin
          history={history}
          title={"Sample Application"}
          dataProvider={dataProvider}
          authProvider={Auth0AuthProvider}
          theme={theme}
          dashboard={Dashboard}
          loginPage={Login}
        >
          <Resource
            name="User"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
            show={UserShow}
          />
          <Resource
            name="Profile"
            list={ProfileList}
            edit={ProfileEdit}
            create={ProfileCreate}
            show={ProfileShow}
          />
          <Resource
            name="Order"
            list={OrderList}
            edit={OrderEdit}
            create={OrderCreate}
            show={OrderShow}
          />
          <Resource
            name="Organization"
            list={OrganizationList}
            edit={OrganizationEdit}
            create={OrganizationCreate}
            show={OrganizationShow}
          />
          <Resource
            name="Customer"
            list={CustomerList}
            edit={CustomerEdit}
            create={CustomerCreate}
            show={CustomerShow}
          />
          <Resource
            name="Empty"
            list={EmptyList}
            edit={EmptyEdit}
            create={EmptyCreate}
            show={EmptyShow}
          />
        </Admin>
      </BrowserRouter>
    </div>
  );
};

export default App;
