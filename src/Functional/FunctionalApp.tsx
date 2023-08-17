import { useEffect, useState } from "react";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalSection } from "./FunctionalSection";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import toast, { Toaster } from "react-hot-toast";

export function FunctionalApp() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<ActiveTab>("all-dogs");
  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => refetchDogs())
      .then(() => {
        toast.success("Dog created!");
      })
      .catch((err) => err)
      .finally(() => setIsLoading(false));
  };
  const refetchDogs = async () => {
    return Requests.getAllDogs().then((dogs) => setDogs(dogs));
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
        {(
          ["all-dogs", "favorite-dogs", "unfavorite-dogs"] as ActiveTab[]
        ).includes(active) ? (
          <FunctionalDogs
            dogs={dogs}
            isLoading={isLoading}
            active={active}
            refetchDogs={() => refetchDogs()}
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
