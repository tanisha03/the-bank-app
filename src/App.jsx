import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from './pages/Home';
import Layout from "./components/Layout";
import Brewery from "./pages/Brewery";
import { tokens } from './configs/theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={tokens}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/:id' element={<Brewery/>} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
