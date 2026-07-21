import css from "./Sortation.module.css";

interface Props {
  sortOrder: string;
  onSortChange: (sortOrder: string) => void;
}

export default function Sortation({ sortOrder, onSortChange }: Props) {
  return (
    <div className={css.radioGroup}>
      <label className={css.radioLabel}>
        <input
          type="radio"
          name="sortOrder"
          value="asc"
          checked={sortOrder === "asc"}
          onChange={() => onSortChange("asc")}
        />
        <span className={css.radioCustom}>▲</span>
      </label>

      <label className={css.radioLabel}>
        <input
          type="radio"
          name="sortOrder"
          value="desc"
          checked={sortOrder === "desc"}
          onChange={() => onSortChange("desc")}
        />
        <span className={css.radioCustom}>▼</span>
      </label>
    </div>
  );
}
