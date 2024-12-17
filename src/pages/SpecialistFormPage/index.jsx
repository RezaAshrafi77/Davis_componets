// import FieldSet from "../../components/FieldSet";
import { useForm } from "react-hook-form"
import RadioOptions from "../../components/RadioOptions"
import Page from "../../components/Page"
import Prescription from "../../sections/Prescription"

export default function SFP() {
    const { watch, setValue } = useForm({
        mode: "all",
        defaultValues: {},
    })
    return (
        <Page>
            <Prescription
                drugsList={watch("1729760426070")}
                onChange={(val) => setValue("1729760426070", val)}
            />
        </Page>
    )
}
