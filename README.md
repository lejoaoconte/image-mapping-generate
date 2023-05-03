# Image Mapping Generate

![LICENSE](https://img.shields.io/npm/l/image-mapping-generate.svg?label=%F0%9F%93%9Clicense&style=for-the-badge)
![version](https://img.shields.io/npm/v/image-mapping-generate.svg?style=for-the-badge)

<figure>
    <img src="https://github.com/lejoaoconte/image-mapping-generate/blob/main/images/demonstration.gif?raw=true" alt="Demonstration" />
    <figcaption style="margin: 0 auto; text-align:center; font-size: 12px; color: #fff; background: rgba(0,0,0,0.7)">Usage demonstration</figcaption>
</figure>

This library is a simple mapping generator to create mapping of points on images, or in other words, if you wanna mapping points on image to send it at email for example you could use this component in your React application to do it. This is a web react component in version 2.0.0 and with Typescript. ✈️

## Instalation

```properties
    npm i image-mapping-generate
    yarn add image-mapping-generate
```

## Basic usage

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

## License

Licensed under MIT