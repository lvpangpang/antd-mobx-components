import "./index.less";
import { getRandomInt } from "js-common-library";

export default function Fallback() {
  const len = Math.ceil((window.innerHeight - 112) / 36);
  const rows = new Array(len).fill("");
  return (
    <div className="app-fallback">
      <div className="header app-loading" />
      <div className="main">
        <div className="nav app-loading" />
        <div className="center">
          <div className="content">
            {rows.map((item, index) => {
              return (
                <div
                  style={{ width: `${getRandomInt(75, 95)}%` }}
                  key={index}
                  className="row app-loading"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
