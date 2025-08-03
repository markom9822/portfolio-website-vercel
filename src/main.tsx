import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'
import App from './App.tsx'
import AdminApp from './Admin.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx';
import "./App.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='admin/*' element={<AdminApp/>}/>
        <Route path='/' element={<App/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)



