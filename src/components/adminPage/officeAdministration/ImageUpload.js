import React from "react";
import { useForm } from "react-hook-form";
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

// import React from "react";
// import { useForm } from "react-hook-form";

// function ImageUpload() {
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("image", data.file[0]);
//     console.log(formData);

//     const res = await fetch("http://localhost:8082/api/v1/offices/17/image", {
//       method: "POST",
//       body: formData,
//     }).then(console.log("Upload succesful"));
//   };

//   return (
//     <div className="App">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <input type="file" {...register("file")} />

//         <input type="submit" />
//       </form>
//     </div>
//   );
// }

// const handleSubmit = React.useCallback((e) => {
//     e.preventDefault();
//     const newOffice = {
//       title,
//       space,
//       price,
//       floor,
//       parking,
//       year,
//       address,
//       city,
//       telephone,
//       description,
//     };
//     if (id) {
//       OfficeService.updateOffice(newOffice, id)
//         .then((res) => {
//           history.push("/admin_offices");
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   });

//   useEffect(() => {
//     OfficeService.findById(id)
//       .then((res) => {
//         setTitle(res.data.title);
//         setSpace(res.data.space);
//         setPrice(res.data.price);
//         setFloor(res.data.floor);
//         setParking(res.data.parking);
//         setYear(res.data.year);
//         setAddress(res.data.address);
//         setCity(res.data.city);
//         setDescription(res.data.description);
//         setTelephone(res.data.telephone);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]);

export default ImageUpload;
