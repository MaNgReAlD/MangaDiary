import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import MangaList from "./components/MangaList";
import MangaForm from "./components/MangaForm";
import MangaCardPage from "./components/MangaCardPage";
import { useState } from "react";
import Controls from "./components/Controls";
import "./styles/App.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "rating" | "finishedAt">("title");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Controls search={search} setSearch={setSearch} sortBy={sortBy} setSortBy={setSortBy} />
              <MangaList search={search} sortBy={sortBy} />
            </>
          }
        />
        <Route path="add" element={<MangaForm />} />
        <Route path="manga/:id" element={<MangaCardPage />} />
      </Route>
    </Routes>
  );
}
