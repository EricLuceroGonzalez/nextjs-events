import { Fragment } from "react";
import MainHeader from "./main-header";

function LayoutComponent(props) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default LayoutComponent;
