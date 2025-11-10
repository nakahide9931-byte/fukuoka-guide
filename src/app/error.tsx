'use client';
export default function GlobalError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
  return (
    <html>
      <body style={{ padding: 24 }}>
        <h2>エラーが発生しました</h2>
        <button onClick={reset}>再試行</button>
      </body>
    </html>
  );
}
