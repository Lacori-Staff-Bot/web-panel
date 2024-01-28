import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import logout from './api/Logout.js';
import './App.css';

import AuthPage from "./pages/auth/Auth";
import DashboardPage from './pages/dashboard/Dashboard';
import GuildPage from './pages/guild/Guild';
import MainSettings from './pages/guild/mainSettings/MainSettings';
import Restrictions from './pages/guild/restrictions/Restrictions';
import ActiveBans from './pages/guild/activeBans/ActiveBans';
import ActiveWarns from './pages/guild/activeWarns/ActiveWarns';
import ActiveBlocks from './pages/guild/activeBlocks/ActiveBlocks';
import NotFound from './pages/notFound/NotFound';

import Switch from './UI/switch/Switch';
import MyButton from './UI/myButton/MyButton';

function App() {
  const [theme, setTheme] = useState("light");
  const [notify, setNotify] = useState(null);
  const [cookies, setCookies, removeCookies] = useCookies(["auth", "key"]);
  const [hideLogout, setHideLogout] = useState(!cookies.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (notify !== null) {
      setTimeout(() => {
        setNotify(null);
      }, 5 * 1000);
    }
  }, [notify]);

  useEffect(() => {
    if (window.location.pathname === "/") {
      if (!cookies.auth) navigate("/auth", { replace: true });
      else navigate("/dashboard", { replace: true });
    }
    if (cookies.auth) setHideLogout(false);
    else setHideLogout(true);
  }, [cookies, navigate]);

  return (
    <div className={theme === "light" ? "App light" : "App dark"}>
      <header className={theme === "light" ? "light" : "dark"}>
        <p className="BotName">Lacori/Staff Bot</p>
        <Switch onChange={(ev) => {
          if (ev.currentTarget.checked) setTheme("dark");
          else setTheme("light");
        }} theme={theme} />
        <MyButton onClick={(ev) => {
          logout(cookies.auth, cookies.key, removeCookies, navigate);
          setHideLogout(true);
        }} type={"Logout"} styles={hideLogout ? { opacity: 0 } : undefined} >Выйти</MyButton>
      </header>
      <div className="Сontainer">
        <Routes>
          <Route path='auth' element={<AuthPage setCookies={setCookies} cookies={cookies} />} />
          <Route path='dashboard' element={<DashboardPage cookies={cookies} removeCookies={removeCookies} />} />
          <Route path='g/:id'>
            <Route index element={<GuildPage theme={theme} mainBlock={<MainSettings cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
            <Route path='restrictions' element={<GuildPage theme={theme} mainBlock={<Restrictions theme={theme} cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
            <Route path='bans' element={<GuildPage theme={theme} mainBlock={<ActiveBans cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} theme={theme} />} />} />
            <Route path='warns' element={<GuildPage theme={theme} mainBlock={<ActiveWarns cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} theme={theme} />} />} />
            <Route path='blocks' element={<GuildPage theme={theme} mainBlock={<ActiveBlocks cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} theme={theme} />} />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      {notify}
    </div>
  );
}

export default App;
