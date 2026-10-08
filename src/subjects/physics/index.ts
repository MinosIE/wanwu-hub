import { createSubject } from "../subjectKit";
import { physicsData } from "./data";

/** 物理学科：轻量内嵌视图（复用主应用顶栏与主题）。 */
export const mount = createSubject({
  rootClass: "physics-root",
  accent: "#2563eb",
  ...physicsData,
});
