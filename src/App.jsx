import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BOT_NAME } from './assets/configs.js';
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

import Switch from './components/UI/switch/Switch';
import MyButton from './components/UI/myButton/MyButton';

export const ThemeContext = React.createContext();
export const NavigateContext = React.createContext();

export function App() {
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
        <p className="BotName">{BOT_NAME}</p>
        <Switch onChange={(ev) => {
          if (ev.currentTarget.checked) setTheme("dark");
          else setTheme("light");
        }} theme={theme} />
        <ThemeContext.Provider value={theme}>
          <MyButton onClick={(ev) => {
            logout(cookies.auth, cookies.key, removeCookies, navigate);
            setHideLogout(true);
          }} type={"Logout"} styles={hideLogout ? { opacity: 0 } : undefined} >Выйти</MyButton>
        </ThemeContext.Provider>
      </header>
      <div className="Сontainer">
        <ThemeContext.Provider value={theme}>
          <NavigateContext.Provider value={navigate}>
            <Routes>
              <Route path='auth' element={<AuthPage setCookies={setCookies} />} />
              <Route path='dashboard' element={<DashboardPage cookies={cookies} removeCookies={removeCookies} />} />
              <Route path='g/:id'>
                <Route index element={<GuildPage mainBlock={<MainSettings cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
                <Route path='restrictions' element={<GuildPage mainBlock={<Restrictions cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
                <Route path='bans' element={<GuildPage mainBlock={<ActiveBans cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
                <Route path='warns' element={<GuildPage mainBlock={<ActiveWarns cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
                <Route path='blocks' element={<GuildPage mainBlock={<ActiveBlocks cookies={cookies} removeCookies={removeCookies} setNotify={setNotify} />} />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </NavigateContext.Provider>
        </ThemeContext.Provider>
      </div>
      {notify}
    </div>
  );
}