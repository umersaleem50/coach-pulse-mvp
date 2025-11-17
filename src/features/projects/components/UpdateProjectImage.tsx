import UpdateImage, {
  type IUpdateImage,
} from "@/shared/components/UpdateImage";
import React from "react";

function UpdateProjectImage(props: IUpdateImage) {
  return <UpdateImage {...props} />;
}

export default UpdateProjectImage;
