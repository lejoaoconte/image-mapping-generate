import * as React from "react";

interface coordsProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  id: string;
  url: string;
}

interface MapperProps {
  URL: string;
  inputStyles: React.CSSProperties;
  buttonDeleteStyles: React.CSSProperties;
  buttonSetStyles: React.CSSProperties;
  buttonCopyStyles: React.CSSProperties;
  setString: string;
  deleteString: string;
  copyString: string;
  setHtml: (value: string) => void;
}

export function Mapper({
  URL,
  inputStyles,
  buttonDeleteStyles,
  buttonSetStyles,
  buttonCopyStyles,
  setString,
  deleteString,
  copyString,
  setHtml,
}: MapperProps) {
  const [coords, setCoords] = React.useState<coordsProps[]>([]);
  const [actualId, setActualId] = React.useState<string>("");
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  function randomId() {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return timestamp;
  }

  function renderCoords() {
    return (
      <map name="image-map">
        {coords.map((coord) => {
          if (coord.x2 !== 0) {
            return (
              <a
                key={coord.id}
                className="selected-area"
                style={{
                  left: coord.x1,
                  top: coord.y1,
                  width: coord.x2 - coord.x1,
                  height: coord.y2 - coord.y1,
                  position: "absolute",
                  background: "#ffffff",
                  opacity: "0.4",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                href={coord.url}
                target="_blank"
              />
            );
          }
        })}
      </map>
    );
  }

  function onMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    const x = event.clientX;
    const y = event.clientY;

    const id = randomId().toString();
    setActualId(id);

    setCoords([...coords, { x1: x, y1: y, x2: 0, y2: 0, id: id, url: "#" }]);
  }

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const x = event.clientX;
    const y = event.clientY;

    const index = coords.findIndex((obj) => obj.id === actualId);
    const div = document.getElementById("select-area");

    const verifyCoords =
      div &&
      coords.length > 0 &&
      index !== -1 &&
      coords[index].x2 === 0 &&
      coords[index].y2 === 0;

    if (verifyCoords) {
      div.style.left = coords[index].x1 + "px";
      div.style.top = coords[index].y1 + "px";
      div.style.width = x - coords[index].x1 + "px";
      div.style.height = y - coords[index].y1 + "px";
      div.style.position = "absolute";
      div.style.background = "#ffffff";
      div.style.opacity = "0.4";
      div.style.cursor = "pointer";
    }
  }

  function onMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    const x = event.clientX;
    const y = event.clientY;

    const coord = coords.filter((obj) => obj.id === actualId)[0];
    if (x - coord.x1 > 20 && y - coord.y1 > 20)
      setCoords((state) =>
        state.map((obj) => {
          if (obj.id === coords[coords.length - 1].id) {
            return { ...obj, x2: x, y2: y };
          }
          return obj;
        })
      );
    else setCoords((state) => state.filter((obj) => obj.id !== actualId));
    setActualId("");
  }

  function setUrlValues(id: string, index: number) {
    const input = document.querySelectorAll(
      ".url-area"
    ) as NodeListOf<HTMLInputElement>;
    const url = input[index].value;

    setCoords((state) =>
      state.map((obj) => {
        if (obj.id === id) {
          return { ...obj, url: url };
        }
        return obj;
      })
    );
  }

  function deleteArea(id: string) {
    setCoords((state) => state.filter((obj) => obj.id !== id));
  }

  function handleImageLoad(
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) {
    const { width, height } = event.currentTarget;
    setDimensions({ width, height });
  }

  function renderURLSetter() {
    return (
      <>
        {coords.map((coord, index) => {
          if (coord.x2 - coord.x1 > 20 && coord.y2 - coord.y1 > 20) {
            return (
              <div key={coord.id} className="url-setter">
                <input
                  style={inputStyles}
                  type="text"
                  name="url-area"
                  className="url-area"
                />
                <button
                  style={buttonSetStyles}
                  onClick={() => setUrlValues(coord.id, index)}
                >
                  {setString}
                </button>
                <button
                  style={buttonDeleteStyles}
                  onClick={() => deleteArea(coord.id)}
                >
                  {deleteString}
                </button>
              </div>
            );
          }
        })}
        {
          <button style={buttonCopyStyles} onClick={copyHtml}>
            {copyString}
          </button>
        }
      </>
    );
  }

  function renderHTMLArea() {
    return (
      <div className="html-area">
        <div
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          style={{
            width: "fit-content",
            height: "fit-content",
            position: "relative",
          }}
        >
          <div id="select-area" className="selected-area" />
          <div
            style={{
              background: `URL("${URL}")`,
              width: dimensions.width,
              height: dimensions.height,
              maxWidth: 800,
              maxHeight: (800 * dimensions.height) / dimensions.width,
              backgroundSize: "contain",
            }}
          />
          {renderCoords()}
        </div>
      </div>
    );
  }

  function copyHtml() {
    let html = `<img src="${URL}" usemap="#image-map">`;
    html += `<map name="image-map">`;
    coords.map((coord) => {
      if (coord.x2 - coord.x1 > 20 && coord.y2 - coord.y1 > 20) {
        html += `<area target="_blank" alt="${coord.id}" title="${coord.id}" href="${coord.url}" coords="${coord.x1},${coord.y1},${coord.x2},${coord.y2}" shape="rect">`;
      }
    });
    html += `</map>`;
    setHtml(html);
  }

  return (
    <div style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      {renderHTMLArea()}
      {renderURLSetter()}
      <img src={URL} onLoad={handleImageLoad} hidden />
    </div>
  );
}
