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
  const [notify, setNotify] = useState([]);
  const [cookies, setCookies, removeCookies] = useCookies(["auth", "key", "theme"]);
  const [hideLogout, setHideLogout] = useState(!cookies.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (notify.length !== 0) {
      setTimeout(() => {
        setNotify(notify => notify.filter(n => n.key !== notify[0].key));
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
    if (!cookies.theme) setCookies("theme", "light");
  }, [cookies, setCookies, setHideLogout, navigate]);

  return (
    <div className={cookies.theme === "light" ? "App light" : "App dark"}>
      <header className={cookies.theme === "light" ? "light" : "dark"}>
        <Switch onChange={(ev) => {
          if (ev.currentTarget.checked) setCookies("theme", "dark");
          else setCookies("theme", "light");
        }} theme={cookies.theme} checked={cookies.theme === "dark" ? true : false} />
        <p className="BotName">{BOT_NAME}</p>
        <ThemeContext.Provider value={cookies.theme}>
          <MyButton onClick={(ev) => {
            logout(cookies.auth, cookies.key, removeCookies, navigate);
            setHideLogout(true);
          }} type={"Logout"} styles={hideLogout ? { opacity: 0 } : undefined} >Выйти</MyButton>
        </ThemeContext.Provider>
      </header>
      <div className="Сontainer">
        <ThemeContext.Provider value={cookies.theme}>
          <NavigateContext.Provider value={navigate}>
            <Routes>
              <Route path='auth' element={<AuthPage setCookies={setCookies} />} />
              <Route path='dashboard' element={<DashboardPage cookies={cookies} removeCookies={removeCookies} />} />
              <Route path='g/:id'>
                <Route index element={<GuildPage mainBlock={<MainSettings cookies={cookies} removeCookies={removeCookies} notify={notify} setNotify={setNotify} />} />} />
                <Route path='restrictions' element={<GuildPage mainBlock={<Restrictions cookies={cookies} removeCookies={removeCookies} notify={notify} setNotify={setNotify} />} />} />
                <Route path='bans' element={<GuildPage mainBlock={<ActiveBans cookies={cookies} removeCookies={removeCookies} notify={notify} setNotify={setNotify} />} />} />
                <Route path='warns' element={<GuildPage mainBlock={<ActiveWarns cookies={cookies} removeCookies={removeCookies} notify={notify} setNotify={setNotify} />} />} />
                <Route path='blocks' element={<GuildPage mainBlock={<ActiveBlocks cookies={cookies} removeCookies={removeCookies} notify={notify} setNotify={setNotify} />} />} />
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </NavigateContext.Provider>
        </ThemeContext.Provider>
      </div>
      <div className="Notifyes">
        {notify}
      </div>
    </div>
  );
}