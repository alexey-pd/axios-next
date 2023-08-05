import { EffectorNext } from "@effector/next";
import type { AppProps } from "next/app";
import "~/shared/model";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <EffectorNext values={pageProps.values}>
        <Component />
      </EffectorNext>
    </main>
  );
}
