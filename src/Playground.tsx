import { divide } from "lodash-es";
import { Requests } from "./api";
import { Dog } from "./types";
import { useState } from "react";

const messAround = async () =>
  await fetch("http://localhost:3000/dogs").then((response) => response.json());

export const Playground = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  return (
    <div>
      <h1>Functions Playground</h1>;
      <button
        onClick={() => {
          messAround().then(setDogs);
        }}
      >
        Press This Button To Trigger `messAround`
      </button>
      <div>
        {dogs.map((dog) => (
          <div key={dog.id}>{dog.name}</div>
        ))}
      </div>
    </div>
  );
};
