// src/app/page.tsx
import { redirect } from 'next/navigation';
export default function Home() {
  redirect('/ja'); // / を開いたら /ja へ
}
