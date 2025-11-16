// type-only import で data.ts の spots 配列要素型を参照（ランタイム取り込みなし）
export type SpotMeta = (typeof import('./data'))['spots'][number];
