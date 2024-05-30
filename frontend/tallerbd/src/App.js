import { LoginForm } from './Componentes/LoginForm/LoginForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Crud from './Screens/Crud';

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<LoginForm />}/>
        <Route path="/crud" element={<Crud />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;