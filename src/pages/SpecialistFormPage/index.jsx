// import FieldSet from "../../components/FieldSet";
import { useForm } from "react-hook-form";
import Page from "../../components/Page";
import FieldSet from "../../components/FieldSet";
import Header from "./layouts/Header";
export default function SFP() {
  const { watch, setValue } = useForm({
    mode: "all",
    defaultValues: {},
  });
  return (
    <Page>
      <div className="w-full px-4 h-[900px]">
        <FieldSet title="fsdfs">
          <div className="w-[100px] h-[300px]"></div>
        </FieldSet>
      </div>
    </Page>
  );
}
