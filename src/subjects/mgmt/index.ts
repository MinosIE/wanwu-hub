import { createSubject } from "../subjectKit";
import { mgmtData } from "./data";

/** 管理学科：轻量内嵌视图（复用主应用顶栏与主题）。 */
export const mount = createSubject({
  rootClass: "mgmt-root",
  accent: "#b45309",
  ...mgmtData,
});
