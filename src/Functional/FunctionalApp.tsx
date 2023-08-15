import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { Dog } from "../types";
import { Requests } from "../api";
import toast, { Toaster } from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<number | null>(null);
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(Requests.getAllDogs)
      .then((dogs) => setDogs(dogs))
      .then(() => {
        toast.success("Dog created!");
      })
      .then(() => setIsLoading(false));
  };
  useEffect(() => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then((dogs) => setDogs(dogs))
      .then(() => setIsLoading(false));
  }, []);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);
  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favoritedCount = favorited.length;
  const unfavoritedCount = unfavorited.length;
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <Toaster />
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        favoritedCount={favoritedCount}
        unfavoritedCount={unfavoritedCount}
        active={active}
        setActive={(number) => setActive(number)}
      >
        {active != 2 ? (
          <FunctionalDogs
            dogs={dogs}
            isLoading={isLoading}
            active={active}
            setDogs={(dogs: Dog[]) => setDogs(dogs)}
            setIsLoading={(bool: boolean) => setIsLoading(bool)}
          />
        ) : (
          <FunctionalCreateDogForm
            submit={(dog: Omit<Dog, "id">) => createDog(dog)}
            isLoading={isLoading}
          />
        )}
      </FunctionalSection>
    </div>
  );
}
