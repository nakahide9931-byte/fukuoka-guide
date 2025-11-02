import LanguageSwitch from '../../components/LanguageSwitch'; // or '@/components/LanguageSwitch'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        {/* 右上に固定表示 */}
        <LanguageSwitch
          style={{
            position: 'fixed',
            right: 16,
            top: 16,
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: 8,
            background: '#fff',
            zIndex: 50,
          }}
        />
        {children}
      </body>
    </html>
  );
}
