"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapper = void 0;
var React = require("react");
function Mapper(_a) {
    var URL = _a.URL;
    var _b = React.useState([]), coords = _b[0], setCoords = _b[1];
    var _c = React.useState(""), actualId = _c[0], setActualId = _c[1];
    function randomId() {
        var maxDate = Date.now();
        var timestamp = Math.floor(Math.random() * maxDate);
        return timestamp;
    }
    function renderCoords() {
        return (<map name="image-map">
        {coords.map(function (coord) {
                if (coord.x2 !== 0) {
                    return (<a key={coord.id} className="selected-area" style={{
                            left: coord.x1,
                            top: coord.y1,
                            width: coord.x2 - coord.x1,
                            height: coord.y2 - coord.y1,
                            position: "absolute",
                            background: "#ffffff",
                            opacity: "0.4",
                            cursor: "pointer",
                            display: "inline-block",
                        }} href={coord.url} target="_blank"/>);
                }
            })}
      </map>);
    }
    function onMouseDown(event) {
        var x = event.clientX;
        var y = event.clientY;
        var id = randomId().toString();
        setActualId(id);
        setCoords(__spreadArray(__spreadArray([], coords, true), [{ x1: x, y1: y, x2: 0, y2: 0, id: id, url: "#" }], false));
    }
    function onMouseMove(event) {
        var x = event.clientX;
        var y = event.clientY;
        var index = coords.findIndex(function (obj) { return obj.id === actualId; });
        var div = document.getElementById("select-area");
        var verifyCoords = div &&
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
    function onMouseUp(event) {
        var x = event.clientX;
        var y = event.clientY;
        var coord = coords.filter(function (obj) { return obj.id === actualId; })[0];
        if (x - coord.x1 > 20 && y - coord.y1 > 20)
            setCoords(function (state) {
                return state.map(function (obj) {
                    if (obj.id === coords[coords.length - 1].id) {
                        return __assign(__assign({}, obj), { x2: x, y2: y });
                    }
                    return obj;
                });
            });
        else
            setCoords(function (state) { return state.filter(function (obj) { return obj.id !== actualId; }); });
        setActualId("");
    }
    function handleSetURLValue(id, index) {
        var input = document.querySelectorAll(".url-area");
        var url = input[index].value;
        setCoords(function (state) {
            return state.map(function (obj) {
                if (obj.id === id) {
                    return __assign(__assign({}, obj), { url: url });
                }
                return obj;
            });
        });
    }
    function handleDeleteArea(id) {
        setCoords(function (state) { return state.filter(function (obj) { return obj.id !== id; }); });
    }
    function renderURLSetter() {
        return coords.map(function (coord, index) {
            if (coord.x2 - coord.x1 > 20 && coord.y2 - coord.y1 > 20) {
                return (<div key={coord.id} className="url-setter">
            <input type="text" name="url-area" className="url-area"/>
            <button onClick={function () { return handleSetURLValue(coord.id, index); }}>
              Set URL
            </button>
            <button onClick={function () { return handleDeleteArea(coord.id); }}>Delete</button>
          </div>);
            }
        });
    }
    function renderHTMLArea() {
        return (<div className="html-area">
        <div onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} style={{
                width: "fit-content",
                height: "fit-content",
                position: "relative",
            }}>
          <div id="select-area" className="selected-area"/>
          <img src={URL}/>
          {renderCoords()}
        </div>
      </div>);
    }
    function handleCopyhtml() {
        var html = "<img src=\"".concat(URL, "\" usemap=\"#image-map\">");
        html += "<map name=\"image-map\">";
        coords.map(function (coord) {
            if (coord.x2 - coord.x1 > 20 && coord.y2 - coord.y1 > 20) {
                html += "<area target=\"_blank\" alt=\"".concat(coord.id, "\" title=\"").concat(coord.id, "\" href=\"").concat(coord.url, "\" coords=\"").concat(coord.x1, ",").concat(coord.y1, ",").concat(coord.x2, ",").concat(coord.y2, "\" shape=\"rect\">");
            }
        });
        html += "</map>";
        console.log(html);
    }
    return (<div style={{ margin: 0, padding: 0, boxSizing: "border-box" }}>
      {renderHTMLArea()}
      {renderURLSetter()}
      <button onClick={handleCopyhtml}>Copy HTML</button>
    </div>);
}
exports.Mapper = Mapper;
