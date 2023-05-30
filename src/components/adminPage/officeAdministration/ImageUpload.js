import React from "react";
//import { useForm } from "react-hook-form";
import OfficeService from "../../../services/OfficeService";

function ImageUpload() {
  const [image, setImage] = React.useState();

  const onSubmit = React.useCallback((data) => {
    data.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);

    const officeId = parseInt(16);

    OfficeService.uploadImageforOffice(officeId, formData).then(
      console.log("Upload succesful")
    );
  });

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <input type="submit" />
      </form>
    </div>
  );
}

export default ImageUpload;
