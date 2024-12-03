/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./styles.module.css"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"

const ProjectName = ({ name, back }) => {
    const navigate = back ? useNavigate() : null

    return (
        <div className={styles.container}>
            <div className="relative w-full z-10">
                <div className="flex items-center justify-center gap-1 mx-auto z-30">
                    <span className={styles.rightLine}></span>
                    {name && <h1 className={styles.name}>{name}</h1>}
                    <span className={styles.leftLine}></span>
                    {back && (
                        <Button
                            title="بازگشت"
                            className="bg-white z-10 px-1 gap-1"
                            variant="text"
                            icon={<FaAngleLeft />}
                            onClick={() => navigate(-1)}
                        />
                    )}
                </div>
                <div className={styles.coverLine}></div>
            </div>
        </div>
    )
}

export default ProjectName
