import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FormProvider } from './context/FormContext';
import Layout from './components/Layout';
import NamePage from './pages/NamePage';
import BranchPage from './pages/BranchPage';
import WelcomePage from './pages/WelcomePage';
import PosterPage from './pages/PosterPage';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<NamePage />} />
        <Route path="/usn" element={<Navigate to="/branch" replace />} />
        <Route path="/branch" element={<BranchPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/poster" element={<PosterPage />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <FormProvider>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </FormProvider>
    </BrowserRouter>
  );
}
