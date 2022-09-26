import { FC, Dispatch, SetStateAction, ChangeEvent } from "react"
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

type ToggleTableButtonProps = {
  setReplaceTable: Dispatch<SetStateAction<boolean>>
}

export const ToggleTableButton: FC<ToggleTableButtonProps> = ({ setReplaceTable }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setReplaceTable(event.target.checked)

  return (
    <FormControlLabel
      control={
        <Switch
          onChange={handleChange}
        />
      }
    label="Replace table"
    labelPlacement="start"
    sx={{
      color: "#777"
    }}
    />
  )
}
