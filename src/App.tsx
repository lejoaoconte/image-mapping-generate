import * as React from "react";

import { Mapper } from "./mapper";

export function App() {
  const [html, setHtml] = React.useState<string>("");

  React.useEffect(() => {
    console.log(html);
  }, [html]);

  return (
    <div style={{ width: "fit-content", maxWidth: 1024, margin: "0" }}>
      <Mapper
        URL="https://images4.alphacoders.com/936/936378.jpg"
        copyString="Copy"
        deleteString="Delete"
        setString="Set URL"
        inputStyles={{ border: "3px solid green" }}
        buttonCopyStyles={{ border: "3px solid green" }}
        buttonDeleteStyles={{ border: "3px solid green" }}
        buttonSetStyles={{ border: "3px solid green" }}
        setHtml={setHtml}
      />
    </div>
  );
}
