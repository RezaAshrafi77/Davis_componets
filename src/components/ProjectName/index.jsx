/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import styles from "./styles.module.css";
import { Button } from "../Button";
import { FaAngleLeft } from "react-icons/fa6";
import classNames from "classnames";
import { Fragment } from "react";

export const ProjectName = ({ name, back, navigate }) => {
  return (
    <div
      className={
        styles.container +
        " " +
        "flex items-center justify-center w-full sticky top-0 bg-white z-10"
      }
    >
      <div className="relative w-full z-10">
        <div className="flex items-center justify-center gap-1 mx-auto z-30">
          {name ? (
            <Fragment>
              <span
                className={classNames(styles.rightLine + " " + "h-0.5 w-4")}
              ></span>
              {name && (
                <h1
                  className={
                    "text-black font-700 text-xs md:text-sm lg:text-lg bg-white z-20 px-2"
                  }
                >
                  {name}
                </h1>
              )}
            </Fragment>
          ) : null}
          <span
            className={classNames(
              styles.leftLine,
              "h-0.5 flex-grow",
              name ? "" : "!h-0"
            )}
          ></span>
          {back && (
            <Button
              title="بازگشت"
              className="!gap-0.5 !px-0 !shadow-none"
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
