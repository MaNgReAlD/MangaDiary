import "../styles/Controls.css"; 

interface Props {
  search: string;
  setSearch: (value: string) => void;
  sortBy: "title" | "rating" | "finishedAt";
  setSortBy: (value: "title" | "rating" | "finishedAt") => void;
}

export default function Controls({ search, setSearch, sortBy, setSortBy }: Props) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Поиск по названию"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value as "title" | "rating" | "finishedAt")}
      >
        <option value="title">По названию</option>
        <option value="rating">По рейтингу</option>
        <option value="finishedAt">По дате</option>
      </select>
    </div>
  );
}
