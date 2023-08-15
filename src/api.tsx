import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: (): Promise<Dog[]> =>
    fetch(`${baseUrl}/dogs`).then((response) => response.json()),
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: async (dog: Omit<Dog, "id">): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    }).then((res) => res.json());
  },

  // should delete a dog from the database
  deleteDog: async (id: number) => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  updateDog: async (patch: boolean, id: number): Promise<Dog> => {
    return fetch(`${baseUrl}/dogs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isFavorite: patch,
      }),
    }).then((res) => res.json());
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
