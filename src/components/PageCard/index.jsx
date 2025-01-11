import styles from "./styles.module.css";

export const PageCard = ({ page, className, navigate, ...props }) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      onClick={() => navigate(page.link)}
      {...props}
    >
      {page.image && (
        <img
          src={page.image}
          className={styles.cardIcon}
          alt={page.title || "Page"}
          loading="lazy"
        />
      )}
      <strong className={styles.title}>{page.title || "Untitled Page"}</strong>
    </div>
  );
};
