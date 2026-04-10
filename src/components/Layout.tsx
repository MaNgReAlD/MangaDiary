import { Outlet, NavLink } from "react-router-dom";
import "../styles/Navigation.css";
import "../styles/App.css";

export default function Layout() {
  return (
    <div className="app">
      <header>
        <h1>Manga Diary</h1>
        <nav>
          <NavLink to="/" end>Главная</NavLink>
          <NavLink to="/add">Добавить мангу</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>© MangaDiary 2026</footer>
    </div>
  );
}
