// Add your own custom types in here
export type Dog = {
  name: string;
  image: string;
  description: string;
  isFavorite: boolean;
  id: number;
};

export type classAppState = {
  isLoading: boolean;
  dogs: Dog[];
  active: ActiveTab;
};
export type classFormState = {
  dogName: string;
  dogDesc: string;
  dogImage: string;
};

export type ActiveTab =
  | "all-dogs"
  | "favorite-dogs"
  | "unfavorite-dogs"
  | "create-dog";
