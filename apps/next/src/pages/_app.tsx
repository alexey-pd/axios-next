import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { PageGate } from "~/shared/model/page";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <EffectorNext values={pageProps.values}>
        <PageGate />
        <Component />
      </EffectorNext>
    </main>
  );
}
