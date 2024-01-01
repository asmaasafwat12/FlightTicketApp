import { Provider } from "react-redux";
import store from "./redux/store";
import Layout from "./components/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
