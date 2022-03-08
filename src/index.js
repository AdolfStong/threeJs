/*
 * @Descripttion:
 * @TapdLink: https://XXX
 * @DesignsLink: https://XXX
 * @RelatedPersons: XXX[市场]、XXX[产品]、XXX[前端]、XXX[后端]、XXX[设计]
 * @version: 1.0.0
 * @Author: shentong
 * @LastEditors: shentong
 * @Date: 2022-03-02 10:46:51
 */
require("./template/GLTFLoader");
// require("./template/FBXLoader");
import "./css/index.css";

/** webpack测试 */
import { cube } from "./math.js";

function component() {
  var element = document.createElement("pre");

  element.innerHTML = ["Hello webpack!", "5 cubed is equal to " + cube(5)].join(
    "\n\n"
  );

  return element;
}

document.body.appendChild(component());
