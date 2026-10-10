/** 数据加载层：复用共享工厂 src/core/dataKit.ts，仅指定本学科数据目录。 */
import { createDataLoader } from "../../../../core/dataKit";

const loader = createDataLoader("life-data/data");

export const dataUrl = loader.dataUrl;
export const fetchData = loader.fetchData;
export const peekData = loader.peekData;
