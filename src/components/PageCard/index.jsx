import PropTypes from "prop-types"
import styles from "./styles.module.css"

const PageCard = ({ page, className, ...props }) => {
    return (
        <a
            href={window.location.href + page.link}
            className={`${styles.container} ${className || ""}`}
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
            <strong className={styles.title}>
                {page.title || "Untitled Page"}
            </strong>
        </a>
    )
}

PageCard.propTypes = {
    page: PropTypes.shape({
        link: PropTypes.string.isRequired,
        title: PropTypes.string,
        image: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
}

export default PageCard
