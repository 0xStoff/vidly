import Layout from "./routes/layout";
import { BrowserRouter } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
