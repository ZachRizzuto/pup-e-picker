import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import "./dogs.css";
import { Requests } from "../api";
import { ActiveTab } from "../types.ts";

export const FunctionalDogs = ({
  dogs,
  isLoading,
  active,
  refetchDogs,
  setIsLoading,
}: {
  dogs: Dog[];
  isLoading: boolean;
  active: ActiveTab;
  refetchDogs: () => void;
  setIsLoading: (bool: boolean) => void;
}) => {
  const filteredDogs = dogs.filter((dog) => {
    if (active === "all-dogs") return true;
    if (active === "favorite-dogs") return dog.isFavorite;
    if (active === "unfavorite-dogs") return !dog.isFavorite;
  });
  return (
    <>
      <div className="dogs">
        {filteredDogs.map((dog) => {
          return (
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
          );
        })}
      </div>
      {/* 
      Commented out so it doesn't annoy you :)
      {isLoading && <div className="spinny">Loading...</div>} 
      */}
    </>
  );
};
