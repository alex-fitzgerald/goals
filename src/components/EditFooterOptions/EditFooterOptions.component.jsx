import React from "react";
import { CustomButton } from "../CustomButton/CustomButton.component";
import { EditFooterOptionsContainer } from "./EditFooterOptions.styles";

export const EditFooterOptions = ({ revertGoal, formSubmit }) => {
    return (
        <EditFooterOptionsContainer>
            <CustomButton clickAction={formSubmit} buttonName="Update" />
            <CustomButton clickAction={revertGoal} buttonName="Cancel" />
        </EditFooterOptionsContainer>
    )
}