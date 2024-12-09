import PropTypes from "prop-types";
import styles from "./styles.module.css";

const PageCard = ({ page, className, navigate, ...props }) => {
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

PageCard.propTypes = {
  page: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  className: PropTypes.string,
  navigate: PropTypes.func,
};

export default PageCard;
