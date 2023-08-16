import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import "./dogs.css";
import { Requests } from "../api";

export const FunctionalDogs = ({
  dogs,
  isLoading,
  active,
  refetchDogs,
  setIsLoading,
}: {
  dogs: Dog[];
  isLoading: boolean;
  active: number | null;
  refetchDogs: () => void;
  setIsLoading: (bool: boolean) => void;
}) => {
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
};
