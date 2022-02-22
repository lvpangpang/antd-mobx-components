import "./index.less";
import { getRandomInt } from "js-common-library";

export default function Fallback() {
  const len = Math.ceil((window.innerHeight - 112) / 36);
  const rows = new Array(len).fill("");
  return (
    <div className="sd-app-fallback">
      <div className="header sd-app-loading" />
      <div className="main">
        <div className="nav sd-app-loading" />
        <div className="center">
          <div className="content">
            {rows.map((item, index) => {
              return (
                <div
                  style={{ width: `${getRandomInt(75, 95)}%` }}
                  key={index}
                  className="row sd-app-loading"
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
