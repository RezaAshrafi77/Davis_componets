import FieldSet from "../../components/FieldSet/index";
import styles from "./styles.module.css";
import classNames from "classnames";

const EmptyForm = ({
  title,
  containerClassName,
  message = "فایل پرونده خالی است.",
  description = "برای نمایش اطلاعات کافیست دکمه نمایش اطلاعات را انتخاب کنید",
}) => {
  return (
    <section className={classNames(styles.container, containerClassName)}>
      <FieldSet
        title={title}
        className={styles.fieldset}
        gradientBorder={false}
      >
        <strong className="text-xs md:text-sm lg:text-base font-700">
          {message}
        </strong>
        <p className="text-2xs lg:text-sm font-400 text-center">
          {description}
        </p>
      </FieldSet>
    </section>
  );
};
export default EmptyForm;
