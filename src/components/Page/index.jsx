import { PageCard } from "../PageCard"
import styles from "./styles.module.css"
import { ProjectName } from "../ProjectName"

export const Page = ({ children, name, back, router, routes, navigate }) => {
    return (
        <div
            className={
                styles.page +
                " " +
                "relative flex h-screen overflow-hidden w-full flex-col pb-4 lg:px-4"
            }
        >
            <img
                src="https://salamatehr.ir/resource/files/1736921470861.png"
                className="absolute left-0 bottom-0 w-full"
                loading="lazy"
            />
            {/* Render the project name if provided */}
            {(name || back) && (
                <ProjectName name={name} back={back} navigate={navigate} />
            )}

            <main
                className={
                    styles.main +
                    " " +
                    "flex flex-1 flex-col justify-start overflow-y-auto md:max-w-full"
                }
            >
                {/* Render routes if router is true; otherwise, render children */}
                {router && routes?.length > 0 ? (
                    <div
                        className={`grid grid-cols-2 gap-3 md:gap-y-8 md:gap-x-6 md:grid-cols-4 
        xl:grid-cols-6 xl:gap-x-8 w-full px-4 pt-4 pb-4 
        lg:pt-8 max-h-full overflow-y-auto mx-auto`}
                    >
                        {routes.map((page) => (
                            <PageCard
                                page={page}
                                key={page.link}
                                navigate={navigate}
                            />
                        ))}
                    </div>
                ) : (
                    children
                )}
            </main>
        </div>
    )
}
