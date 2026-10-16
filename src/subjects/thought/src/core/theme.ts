/** 主题：复用共享工厂 createSubjectTheme，行为与迁移前一致。 */
import { onLangChange, t } from "./i18n";
import { createSubjectTheme } from "../../../../core/subject/theme";

const theme = createSubjectTheme({ t, onLangChange });

export const { currentTheme, initTheme } = theme;
