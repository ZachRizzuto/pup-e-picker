import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<{
  dogs: Dog[];
  isLoading: boolean;
  active: ActiveTab;
  refetchDogs: () => void;
  setIsLoading: (bool: boolean) => void;
}> {
  render() {
    const { dogs, isLoading, active, refetchDogs, setIsLoading } = this.props;
    const filteredDogs = dogs.filter((dog) => {
      if (active === "all-dogs") return true;
      if (active === "favorite-dogs") return dog.isFavorite;
      if (active === "unfavorite-dogs") return !dog.isFavorite;
    });
    return (
      <>
        <div className="dogs">
          {filteredDogs.map((dog) => (
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
        {/* {isLoading && <div className="spinny">Loading...</div>} */}
      </>
    );
  }
}
