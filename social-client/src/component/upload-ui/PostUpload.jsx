import React, { useState } from "react";
import "./upload-ui.css";
import AddImage from "../../image/upload-ui/photos.png";
import { useSelector } from "react-redux";

const PostUpload = () => {
  const [fileDetail, setFileDetail] = useState({
    file: "",
    imagepreviewUrl: "",
  });

  const [location, setLocation] = useState("");

  const [caption, setCaption] = useState("");

  const userDetail = JSON.parse(localStorage.getItem("userData"));

  // console.log(userDetail);

  async function handleImageChange(e) {
    try {
      e.preventDefault();

      let reader = new FileReader();

      // console.log(reader);

      let file = e.target.files[0];

      reader.onloadend = () => {
        setFileDetail({ file: file, imagepreviewUrl: reader.result });
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(e) {
    if (fileDetail.imagepreviewUrl === "") {
      console.log("Choose An Image To Upload");
      return;
    }
    try {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      console.log("handle uploading-", fileDetail);

      let url = "/postimage";

      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userDetail._id,
          location: location,
          caption: caption,
          image: fileDetail.imagepreviewUrl,
        }),
      };

      // console.log(option.body);

      const response = await fetch(url, option);

      const data = await response.json();

      console.log(data);
      setCaption("");
      setLocation("");
      setFileDetail({ file: "", imagepreviewUrl: "" });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="upload-post-main">
        {fileDetail.imagepreviewUrl ? (
          <div className="img-preview ">
            <img
              src={fileDetail.imagepreviewUrl}
              alt=""
              className="img-fluid"
            />
          </div>
        ) : (
          ""
        )}

        <form>
          <label className="add-label btn btn-primary px-5">
            Add Image{" "}
            <img
              src={AddImage}
              alt="+"
              className="img-fluid mx-1"
              style={{ width: "2rem" }}
            />
            <input
              className="fileInput"
              type="file"
              onChange={(e) => handleImageChange(e)}
              required
            />
          </label>
          <div className="d-flex flex-column py-2">
            <textarea
              name="caption"
              id="caption-add"
              cols="30"
              rows="10"
              placeholder="Add caption to your post."
              className="form-control"
              value={caption}
              onChange={(e) => {
                setCaption(e.target.value);
              }}
              required
            ></textarea>
            <input
              type="text"
              placeholder="Add Location"
              id="add-location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
              required
            />
          </div>
        </form>
        <button
          className="submitButton btn btn-primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Post To Feed
        </button>
      </div>
    </>
  );
};

export default PostUpload;
