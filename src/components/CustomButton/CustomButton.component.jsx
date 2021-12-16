import React from "react";
import { CustomButtonContainer } from "./CustomButton.styles";

export const CustomButton = ({ clickAction, buttonName }) => {
    return(
        <CustomButtonContainer onClick={clickAction}>
            {buttonName}
        </CustomButtonContainer>
    )
}