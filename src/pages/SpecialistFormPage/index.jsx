// import FieldSet from "../../components/FieldSet";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import FieldSet from "../../components/FieldSet";
import Header from "../SpecialistDashboardPage/layouts/Header";
export default function SFP() {
  const { watch, setValue, control, handleSubmit } = useForm({
    mode: "all",
    defaultValues: {},
  });
  return (
    <Page>
      <Header handleSubmit={handleSubmit} watch={watch} control={control} />
    </Page>
  );
}
