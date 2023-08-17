import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { Requests } from "../api";
import { ActiveTab, Dog, classAppState } from "../types";
import toast from "react-hot-toast";

export class ClassApp extends Component {
  state: classAppState = {
    isLoading: false,
    dogs: [],
    active: "all-dogs",
  };
  componentDidMount(): void {
    this.setState({ isLoading: true });
    Requests.getAllDogs()
      .then((dogs) => this.setState({ dogs: dogs }))
      .then(() => this.setState({ isLoading: false }));
  }
  createDog(dog: Omit<Dog, "id">) {
    this.setState({ isLoading: true });
    Requests.postDog(dog)
      .then(() => this.refetchDogs())
      .then(() => {
        toast.success("Dog created!");
      })
      .then(() => this.setState({ isLoading: false }));
  }
  async refetchDogs() {
    return Requests.getAllDogs().then((dogs) => this.setState({ dogs: dogs }));
  }
  render() {
    const { isLoading, dogs, active } = this.state;
    const favoritedCount = dogs.filter(
      (dog: Dog) => dog.isFavorite === true
    ).length;
    const unfavoritedCount = dogs.filter(
      (dog: Dog) => dog.isFavorite === false
    ).length;
    return (
      <div className="App" style={{ backgroundColor: "goldenrod" }}>
        <header>
          <h1>pup-e-picker (Class Version)</h1>
        </header>
        <ClassSection
          favoritedCount={favoritedCount}
          unfavoritedCount={unfavoritedCount}
          active={active}
          setActive={(number) => this.setState({ active: number })}
        >
          {(
            ["all-dogs", "favorite-dogs", "unfavorite-dogs"] as ActiveTab[]
          ).includes(active) ? (
            <ClassDogs
              dogs={dogs}
              isLoading={isLoading}
              active={active}
              refetchDogs={() => this.refetchDogs()}
              setIsLoading={(bool: boolean) =>
                this.setState({ isLoading: bool })
              }
            />
          ) : (
            <ClassCreateDogForm
              submit={(dog: Omit<Dog, "id">) => this.createDog(dog)}
              isLoading={isLoading}
            />
          )}
        </ClassSection>
      </div>
    );
  }
}
