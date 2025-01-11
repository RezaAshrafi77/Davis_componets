import { PageCard } from "../PageCard";
import styles from "./styles.module.css";
import { ProjectName } from "../ProjectName";

export const Page = ({ children, name, back, router, routes, navigate }) => {
  return (
    <div className={styles.page}>
      {/* Render the project name if provided */}
      {(name || back) && (
        <ProjectName name={name} back={back} navigate={navigate} />
      )}

      <main className={styles.main}>
        {/* Render routes if router is true; otherwise, render children */}
        {router && routes?.length > 0 ? (
          <div className={styles.router}>
            {routes.map((page) => (
              <PageCard page={page} key={page.link} navigate={navigate} />
            ))}
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};
