import React, { useState } from "react";
import "./upload-ui.css";
import AddImage from "../../image/upload-ui/photos.png";
import axios from "axios";

const PostUpload = () => {
  const [previewImg, setPreviewImg] = useState("");
  const [selectFile, setSelectFile] = useState("");

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

      setSelectFile(file);

      reader.onloadend = () => {
        setPreviewImg(reader.result);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(e) {
    try {
      if (previewImg === "" || selectFile === null) {
        console.log("Choose An Image To Upload");
        return;
      }

      e.preventDefault();
      // TODO: do something with -> this.state.file

      let url = "/postimage";

      const formdata = new FormData();

      formdata.append("file", selectFile);

      let imgdata = JSON.stringify({
        id: userDetail._id,
        location: location,
        caption: caption,
      });

      formdata.append("details", imgdata);

      axios
        .post(url, formdata, {
          headers: { Content_type: "multipart/form-data" },
        })
        .then((res) => {
          console.log(res.data.message);
          window.alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });

      setCaption("");
      setLocation("");
      setSelectFile(null);
      setPreviewImg("");
    } catch (error) {
      // console.log(error);
    }
  }

  // console.log(selectFile);

  return (
    <>
      <div className="upload-post-main">
        <form>
          <div className="img-preview ">
            {previewImg ? (
              <img src={previewImg} alt="" className="img-fluid" />
            ) : null}
          </div>
          <label className="add-label btn btn-primary px-5">
            Add Image{" "}
            <img
              src={AddImage}
              alt="+"
              className="img-fluid mx-1"
              style={{ width: "2rem", backgroundColor: "transparent" }}
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
              rows="4"
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
              id="add-location "
              className="form-control my-1"
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
