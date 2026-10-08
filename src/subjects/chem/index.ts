import { createSubject } from "../subjectKit";
import { chemData } from "./data";

/** 化学学科：轻量内嵌视图（复用主应用顶栏与主题）。 */
export const mount = createSubject({
  rootClass: "chem-root",
  accent: "#16a34a",
  ...chemData,
});
