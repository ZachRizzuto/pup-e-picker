import { ReactNode } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import "./dogs.css";

export const FunctionalDogs = ({
  dogs,
  isLoading,
  active,
}: {
  dogs: Dog[];
  isLoading: boolean;
  active: number | null;
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
                alert("clicked trash");
              }}
              onHeartClick={() => {
                alert("clicked heart");
              }}
              onEmptyHeartClick={() => {
                alert("clicked empty heart");
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
                  alert("clicked trash");
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
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
                  alert("clicked trash");
                }}
                onHeartClick={() => {
                  alert("clicked heart");
                }}
                onEmptyHeartClick={() => {
                  alert("clicked empty heart");
                }}
                isLoading={isLoading}
              />
            ))}
      </div>
      {isLoading && <div className="spinny">Loading...</div>}
    </>
  );
};
