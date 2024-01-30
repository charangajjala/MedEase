import { useState } from "react";
import "./CategoryReport.scss";
import Endpoints from "../../../constants/endpoints";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

// const columnHeaders = [
//   { key: "id", label: "ID" },
//   { key: "categoryName", label: "Name" },
//   { key: "description", label: "Description" },
// ];

const CategoryReport = () => {
  const [file, setFile] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axiosPrivate.post(
          Endpoints.UPLOAD_FILE_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default CategoryReport;
