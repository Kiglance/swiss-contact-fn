import { Provider } from "react-redux";
import AllRoutes from "./config/routes.config";
import { ContentProvider } from "./context/ContentContext";
import store from "./redux/store";
import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <LoginProvider>
      <ContentProvider>
        <Provider store={store}>
          <AllRoutes />
        </Provider>
      </ContentProvider>
    </LoginProvider>
  );
}

export default App;
