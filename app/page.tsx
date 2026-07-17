import css from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Welcome to NOTEStodo</h1>
        <p className={css.description}>
          NOTEStodo is a lightweight and intuitive tool for capturing your daily
          tasks and ideas. Stay on top of your to-do list and never miss an
          important thought again, whether you are at your desk or on the move.
        </p>
        <p className={css.description}>
          With a clean and distraction-free interface, NOTEStodo makes it easy
          to create, edit, and organize your notes and tasks. Filter by
          priority, search by keyword, and keep everything you need right at
          your fingertips.
        </p>
      </div>
    </main>
  );
}
