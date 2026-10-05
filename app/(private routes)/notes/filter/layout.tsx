// app/notes/filter/layout.tsx
import css from "./layout.module.css";
type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  modal: React.ReactNode;
};

const NotesLayout = ({ children, sidebar, modal }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
      {modal}
    </section>
  );
};

export default NotesLayout;
