import { FieldSet } from "../../components/FieldSet";
import classNames from "classnames";

export const EmptyForm = ({
  title,
  containerClassName,
  message = "فایل پرونده خالی است.",
  description = "برای نمایش اطلاعات کافیست دکمه جستجو را انتخاب کنید",
}) => {
  return (
    <section
      className={classNames(
        "mx-auto my-12 border-[0.5px] px-3 shadow-md w-[70vw] min-w-[270px] rounded-lg md:min-w-[500px] lg:w-[45%]",
        containerClassName
      )}
    >
      <FieldSet
        title={title}
        className={
          "pt-3 mb-3 mt-1 flex w-full flex-col items-center gap-2 md:gap-4 shadow-primary"
        }
        gradientBorder={false}
      >
        <strong className="text-xs md:text-sm xl:text-base font-700 mt-4">
          {message}
        </strong>
        <p className="text-2xs md:text-xs xl:text-sm font-400 text-center">
          {description}
        </p>
      </FieldSet>
    </section>
  );
};
