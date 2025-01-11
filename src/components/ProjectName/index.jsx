/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./styles.module.css";
import { Button } from "../Button";
import { FaAngleLeft } from "react-icons/fa6";
import classNames from "classnames";
import { Fragment } from "react";

export const ProjectName = ({ name, back, navigate }) => {
  return (
    <div className={styles.container}>
      <div className="relative w-full z-10">
        <div className="flex items-center justify-center gap-1 mx-auto z-30">
          {name ? (
            <Fragment>
              <span className={classNames(styles.rightLine)}></span>
              {name && <h1 className={styles.name}>{name}</h1>}
            </Fragment>
          ) : null}
          <span
            className={classNames(styles.leftLine, name ? "" : "!h-0")}
          ></span>
          {back && (
            <Button
              title="بازگشت"
              className="!gap-0.5"
              variant="text"
              icon={<FaAngleLeft />}
              onClick={() => {
                navigate(-1);
                return false;
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
