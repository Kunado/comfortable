import { Dispatch, SetStateAction, FC } from "react";
import { css } from "@emotion/css";
import { ToggleTableButton } from "./ToggleTableButton";

type WrapperHeaderProps = {
  setReplaceTable: Dispatch<SetStateAction<boolean>>
}

export const WrapperHeader: FC<WrapperHeaderProps> = ({ setReplaceTable }) => {
  return (
    <div className={headerWrapperStyle}>
      <span className={componentTitleStyle}>ComforTable</span>
      <ToggleTableButton setReplaceTable={setReplaceTable} />
    </div>
  )
}

const componentTitleStyle = css({
  fontWeight: "bold",
  color: "#777"
})

const headerWrapperStyle = css({
  display: "flex",
  justifyContent: "space-between",
  padding: "5px"
})
