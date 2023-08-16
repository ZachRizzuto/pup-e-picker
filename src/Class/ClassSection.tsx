// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";

export class ClassSection extends Component<{
  favoritedCount: number;
  unfavoritedCount: number;
  active: number | null;
  setActive: (number: number | null) => void;
  children: ReactNode;
}> {
  render() {
    const { favoritedCount, unfavoritedCount, active, setActive, children } =
      this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
          <Link to={"/Functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${active === 0 && "active"}`}
              onClick={() => {
                active === 0 ? setActive(null) : setActive(0);
              }}
            >
              favorited ( {favoritedCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${active === 1 && "active"}`}
              onClick={() => {
                active === 1 ? setActive(null) : setActive(1);
              }}
            >
              unfavorited ( {unfavoritedCount} )
            </div>
            <div
              className={`selector ${active === 2 && "active"}`}
              onClick={() => {
                active === 2 ? setActive(null) : setActive(2);
              }}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
