// you can use this type for react children if you so choose
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ActiveTab } from "../types.ts";

export const FunctionalSection = ({
  favoritedCount,
  unfavoritedCount,
  active,
  setActive,
  children,
}: {
  favoritedCount: number;
  unfavoritedCount: number;
  active: ActiveTab;
  setActive: (input: ActiveTab) => void;
  children: ReactNode;
}) => {
  // const [active, setActive] = useState<number | null>(null);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${active === "favorite-dogs" && "active"}`}
            onClick={() => {
              active === "favorite-dogs"
                ? setActive("all-dogs")
                : setActive("favorite-dogs");
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${active === "unfavorite-dogs" && "active"}`}
            onClick={() => {
              active === "unfavorite-dogs"
                ? setActive("all-dogs")
                : setActive("unfavorite-dogs");
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${active === "create-dog" && "active"}`}
            onClick={() => {
              active === "create-dog"
                ? setActive("all-dogs")
                : setActive("create-dog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
