/** 跨模块相关条目：复用共享工厂 createRelated，table 缓存为本实例私有。 */
import { fetchData } from "./data";
import { getLang } from "./i18n";
import { app } from "./app";
import { createRelated } from "../../../../core/subject/related";

const related = createRelated({ fetchData, getLang, app });

export const { preloadRelated, relatedChips } = related;
