import TextField from "../../components/TextField"

export default function SFP() {
    return (
        <div className="flex w-full h-screen justify-center items-center">
            <TextField
                label={"Reza"}
                containerClassName={"w-[320px]"}
                divider="left"
                required
                en
            />
        </div>
    )
}
