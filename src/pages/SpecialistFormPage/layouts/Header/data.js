import { BsQrCodeScan } from "react-icons/bs";
import { FaUser } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";

export const Table_Columns = [
  "ردیف",
  "نام و نام خانوادگی",
  "کدملی",
  "جنسیت",
  "تاریخ تولد",
  " خدمات",
  "وضعیت خدمت",
  "تاریخ پذیرش",
  "نام پکیج",
];

export const Form_Inputs = [
  {
    label: `RF Id`,
    icon: BsQrCodeScan,
    placeholder: "در این قسمت وارد کنید",
    qKey: 6365,
  },
  {
    label: `نام خانوادگی`,
    icon: FaUser,
    placeholder: "",
    qKey: 4942,
  },
  {
    label: `کد ملی`,
    icon: HiMiniIdentification,
    placeholder: "در این قسمت وارد کنید",
    qKey: 6620,
  },
];

export const Service_Status = [
  {
    label: "دریافت شده",
    value: "1585472544360",
  },
  {
    label: "دریافت نشده",
    value: "1585472556811",
  },
];
