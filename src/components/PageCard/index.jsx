import PropTypes from "prop-types"
import styles from "./styles.module.scss"
import { Link } from "react-router-dom"

const PageCard = ({ page, className, ...props }) => {
    return (
        <Link
            to={page.link}
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
        </Link>
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

PageCard.defaultProps = {
    className: "",
}

export default PageCard
