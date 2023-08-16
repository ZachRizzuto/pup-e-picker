import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  dogs: Dog[];
  isLoading: boolean;
  active: number | null;
  refetchDogs: () => void;
  setIsLoading: (bool: boolean) => void;
}> {
  render() {
    const { dogs, isLoading, active, refetchDogs, setIsLoading } = this.props;
    return (
      <>
        <div className="dogs">
          {active === null &&
            dogs.map((dog) => (
              <DogCard
                dog={{
                  id: dog.id,
                  image: dog.image,
                  description: dog.description,
                  isFavorite: dog.isFavorite,
                  name: dog.name,
                }}
                key={dog.id}
                onTrashIconClick={() => {
                  setIsLoading(true);
                  Requests.deleteDog(dog.id)
                    .then(() => refetchDogs())
                    .then(() => setIsLoading(false));
                }}
                onHeartClick={() => {
                  setIsLoading(true);
                  Requests.updateDog(false, dog.id)
                    .then(() => refetchDogs())
                    .then(() => setIsLoading(false));
                }}
                onEmptyHeartClick={() => {
                  setIsLoading(true);
                  Requests.updateDog(true, dog.id)
                    .then(() => refetchDogs())
                    .then(() => setIsLoading(false));
                }}
                isLoading={isLoading}
              />
            ))}
          {active === 0 &&
            dogs
              .filter((dog) => dog.isFavorite === true)
              .map((dog) => (
                <DogCard
                  dog={{
                    id: dog.id,
                    image: dog.image,
                    description: dog.description,
                    isFavorite: dog.isFavorite,
                    name: dog.name,
                  }}
                  key={dog.id}
                  onTrashIconClick={() => {
                    setIsLoading(true);
                    Requests.deleteDog(dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  onHeartClick={() => {
                    setIsLoading(true);
                    Requests.updateDog(false, dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  onEmptyHeartClick={() => {
                    setIsLoading(true);
                    Requests.updateDog(true, dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  isLoading={isLoading}
                />
              ))}
          {active === 1 &&
            dogs
              .filter((dog) => dog.isFavorite === false)
              .map((dog) => (
                <DogCard
                  dog={{
                    id: dog.id,
                    image: dog.image,
                    description: dog.description,
                    isFavorite: dog.isFavorite,
                    name: dog.name,
                  }}
                  key={dog.id}
                  onTrashIconClick={() => {
                    setIsLoading(true);
                    Requests.deleteDog(dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  onHeartClick={() => {
                    setIsLoading(true);
                    Requests.updateDog(false, dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  onEmptyHeartClick={() => {
                    setIsLoading(true);
                    Requests.updateDog(true, dog.id)
                      .then(() => refetchDogs())
                      .then(() => setIsLoading(false));
                  }}
                  isLoading={isLoading}
                />
              ))}
        </div>
        {isLoading && <div className="spinny">Loading...</div>}
      </>
    );
  }
}
