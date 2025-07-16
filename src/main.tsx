import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import LogIn from './pages/login/log-in.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Profile from './pages/profile/profile.tsx'
import SignIn from './pages/signin/sign-in.tsx'
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
    <Toaster/>
  </StrictMode>,
)
