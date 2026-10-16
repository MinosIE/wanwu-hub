/** 详情抽屉：复用共享工厂 createSubjectDetail，DOM 结构与迁移前完全一致。 */
import { esc, need } from "./dom";
import { getLang, t } from "./i18n";
import { createSubjectDetail } from "../../../../core/subject/detail";

const detail = createSubjectDetail({ esc, need, t, getLang });

export const { initDetail, openDetail, closeDetail, srcLabel } = detail;
