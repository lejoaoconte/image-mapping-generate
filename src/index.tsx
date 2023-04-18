import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Mapper } from "./mapper";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<Mapper URL="https://www.w3schools.com/html/workplace.jpg" />);
