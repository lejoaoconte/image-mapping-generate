# [En] Image Mapping Generate
<img src="https://camo.githubusercontent.com/e8e44ca3a83f1593b9280f94dd5f463adc21727636dc028e2ff7fea42e5b4faf/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f72656163742d746f6173746966792e7376673f6c6162656c3d2546302539462539332539436c6963656e7365267374796c653d666f722d7468652d6261646765" alt="NPM" data-canonical-src="https://img.shields.io/npm/l/react-toastify.svg?label=%F0%9F%93%9Clicense&amp;style=for-the-badge" style="max-width: 100%;"/>

<img src="">

This library is a simple mapping generator to create mapping of points on images, or in other words, if you wanna mapping points on image to send it at email for example you could use this component in your React application to do it. This is a web react component in version 2.0.0 and with Typescript.

## Instalation

```properties
    npm i image-mapping-generate
    yarn add image-mapping-generate
```

## Basic use

```javascript
    import { useEffect, useState } from "react";
    import { Mapper } from "image-mapping-generate";

    function App() {
        const [html, setHtml] = useState("");

        useEffect(() => {
            console.log(html);
        }, [html]);

        return (
            <Mapper
                URL="https://via.placeholder.com/2000x2000"
                copyString="Copy-text"
                deleteString="Delete-text"
                setString="Set-URL-text"
                inputStyles={{ border: "3px solid green" }}
                buttonCopyStyles={{ border: "3px solid green" }}
                buttonDeleteStyles={{ border: "3px solid green" }}
                buttonSetStyles={{ border: "3px solid green" }}
                setHtml={setHtml}
            />
        );
    }

    export default App;
```