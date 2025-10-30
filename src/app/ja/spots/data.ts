// 最低限の型（空配列でも never[] にならない）
export type SpotJa = {
  slug: string;
  image?: string;
  name?: { ja?: string; en?: string } | string;
  summary?: { ja?: string; en?: string } | string;
};

export const spots: SpotJa[] = [
  // ← ここにあなたの JA データを並べる（空でもOK）
];
