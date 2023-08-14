import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = ({
  submit,
  isLoading,
}: {
  submit: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}) => {
  const [dogName, setDogName] = useState("");
  const [dogDesc, setDogDesc] = useState("");
  const [dogImage, setDogImage] = useState("");
  return (
    <form
      action=""
      id="create-dog-form"
      onSubmit={(e) => {
        e.preventDefault();
        submit({
          name: dogName,
          image: dogImage,
          description: dogDesc,
          isFavorite: false,
        });
        console.log(dogName, dogDesc, dogImage);
        setDogName("");
        setDogDesc("");
        setDogImage("");
      }}
    >
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        type="text"
        disabled={isLoading}
        onChange={(e) => setDogName(e.target.value)}
        value={dogName}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        disabled={isLoading}
        onChange={(e) => setDogDesc(e.target.value)}
        value={dogDesc}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        id=""
        onChange={(e) => setDogImage(e.target.value)}
        value={dogImage}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" disabled={isLoading} />
    </form>
  );
};
