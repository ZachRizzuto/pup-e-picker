import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Dog } from "../types";
const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component<{
  submit: (dog: Omit<Dog, "id">) => void;
  isLoading: boolean;
}> {
  state = {
    dogName: "",
    dogDesc: "",
    dogImage: defaultSelectedImage,
  };
  resetForm() {
    this.setState({ dogName: "" });
    this.setState({ dogDesc: "" });
    this.setState({ dogImage: defaultSelectedImage });
  }
  render() {
    const { submit, isLoading } = this.props;
    const { dogName, dogDesc, dogImage } = this.state;
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
          this.resetForm();
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => this.setState({ dogName: e.target.value })}
          disabled={isLoading}
          value={dogName}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => this.setState({ dogDesc: e.target.value })}
          disabled={isLoading}
          value={dogDesc}
        />
        <label htmlFor="picture">Select an Image</label>
        <select
          onChange={(e) => this.setState({ dogImage: e.target.value })}
          disabled={isLoading}
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
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  }
}
