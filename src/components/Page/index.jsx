import PropTypes from "prop-types"
import PageCard from "../PageCard/index"
import styles from "./styles.module.css"
import ProjectName from "../ProjectName"

const Page = ({ children, name, back, router, routes }) => {
    return (
        <div className={styles.page}>
            {/* Render the project name if provided */}
            {(name || back) && <ProjectName name={name} back={back} />}

            <main className={styles.main}>
                {/* Render routes if router is true; otherwise, render children */}
                {router && routes?.length > 0 ? (
                    <div className={styles.router}>
                        {routes.map((page) => (
                            <PageCard page={page} key={page.link} />
                        ))}
                    </div>
                ) : (
                    children
                )}
            </main>
        </div>
    )
}

// PropTypes for type checking
Page.propTypes = {
    children: PropTypes.node,
    name: PropTypes.string,
    back: PropTypes.bool,
    router: PropTypes.bool,
    routes: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string.isRequired,
            title: PropTypes.string, // Add other fields as needed
            image: PropTypes.string,
        })
    ),
}

export default Page
