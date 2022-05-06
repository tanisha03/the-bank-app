import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from './pages/Home';
import Layout from "./components/Layout";
import BankDetails from "./pages/BankDetails";
import { tokens } from './configs/theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={tokens}>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Navigate to="/all-banks" />} />
            <Route exact path='/all-banks' element={<Home/>} />
            <Route exact path='/bank-details/:id' element={<BankDetails/>} />
            <Route path='*' element={<h1>Not found</h1>} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

export default App;
