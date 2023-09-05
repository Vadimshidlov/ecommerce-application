import React from "react";
import { ReactComponent as IcoEdit } from "assets/svg/edit.svg";
import "view/app-components/Profile/style.scss";
import Text from "shared/components/Text/text";

export default function EditButton({ ...props }) {
    return (
        <button {...props} className="edit-button">
            <IcoEdit className="ico-edit" />
            <Text classes={["inter-400-font", "font-size_m"]}>Edit</Text>
        </button>
    );
}
