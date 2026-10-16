/**
 * 界面词表：本学科 wordbook 在 i18n.json（zh / en 两套键）。
 * 通过共享工厂实例化一份独立状态（lang / listeners / i18nRoot 不与其它学科串扰）。
 * 键对齐由泛型约束（en 缺键会在下方编译报错）+ scripts/check-i18n.mjs 双重保障。
 */
import wordbook from "./i18n.json";
import { createSubjectI18n } from "../../../../core/subject/i18n";

const i18n = createSubjectI18n(wordbook);

export const {
  I18N,
  initLang,
  getLang,
  setLang,
  onLangChange,
  t,
  L,
  applyStaticLang,
  setI18nRoot,
} = i18n;
