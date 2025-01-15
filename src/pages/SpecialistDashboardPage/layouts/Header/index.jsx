/* eslint-disable react/prop-types */
import { Button } from "../../../../components/Button";
import { TextField } from "../../../../components/TextField";
import { DateInput } from "../../../../components/DateInput";
import { FieldSet } from "../../../../components/FieldSet";
import { MdOutlinePersonSearch } from "react-icons/md";
import NationalCodeSVG from "../../../../assets/icons/nationalCode.svg";

export const Header = ({
  loading = false,
  title = "مشخصات کاربر",
  register,
  watch,
  control,
  onSubmit,
  setPage,
}) => {
  return (
    <FieldSet title={title} className={"lg:!px-3 !pb-0"}>
      <form
        className={"flex itesm-center"}
        onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          onSubmit();
        }}
      >
        <div className="grid md:grid-cols-2 lg:flex items-center w-full flex-wrap gap-x-4 lg:gap-x-3 xl:gap-x-5 gap-y-4">
          <DateInput
            containerClassName={"!flex-row !flex-1 lg:!w-auto !gap-3"}
            className={"flex-1"}
            label={"از تاریخ :"}
            id="from_date"
            control={control}
            watch={watch}
          />
          <DateInput
            containerClassName={"!flex-row !flex-1 lg:!w-auto !gap-3"}
            className={"flex-1"}
            label={"تا تاریخ :"}
            id="end_date"
            control={control}
            watch={watch}
          />
          <TextField
            containerClassName={"!flex-row !flex-1 lg:!w-auto !gap-3"}
            className={"flex-1"}
            questionKey={"6620"}
            watch={watch}
            register={register}
            placeholder={"در این قسمت وارد کنید"}
            label={"کد ملی :"}
            icon={<img src={NationalCodeSVG} alt="کد ملی" />}
          />
          <div className="lg:hidden"></div>
          <div className="md:block col-span-full lg:hidden md:mt-2">
            <Button
              variant="outlined"
              title={"جستجو"}
              type="submit"
              loading={loading}
              className={
                "w-[120px] md:w-[150px] lg:w-[92px] xl:w-[110px] md:ml-0 !py-0 !h-[24px] md:!h-[28px] lg:!h-[34px] !shadow-sm !bg-[#f7f7f7] !text-black !border-success hover:!bg-success hover:!text-white transition-all !text-2xs md:!text-xs lg:!text-sm gap-2 xl:gap-3" +
                " " +
                "!mx-auto"
              }
              icon={
                <MdOutlinePersonSearch className="text-xs md:text-base lg:text-xl" />
              }
            />
          </div>
          <Button
            variant="outlined"
            title={"جستجو"}
            type="submit"
            loading={loading}
            className={
              "w-[120px] md:w-[150px] lg:w-[92px] xl:w-[110px] md:ml-0 !py-0 !h-[24px] md:!h-[28px] lg:!h-[34px] !shadow-sm !bg-[#f7f7f7] !text-black !border-success hover:!bg-success hover:!text-white transition-all !text-2xs md:!text-xs lg:!text-sm gap-2 xl:gap-3" +
              " " +
              "!hidden lg:!flex"
            }
            icon={<MdOutlinePersonSearch className="text-sm lg:text-xl" />}
          />
        </div>
      </form>
    </FieldSet>
  );
};
