import React from "react";
import { CardFooterContainer } from "./CardFooter.styles";
import { CustomButton } from "../CustomButton/CustomButton.component";

export const CardFooter = ({ category, scope, clickAction }) => {
  return(
    <CardFooterContainer>
      Test
    </CardFooterContainer>
    // <CardFooterContainer>
    //   <p className="category">
    //     {category}
    //   </p>
    //   <p>
    //     {scope}
    //   </p>
    //   <CustomButton name="delete"
    //     clickAction={null}>Delete
    //   </CustomButton>
    // </CardFooterContainer>
  )
}
