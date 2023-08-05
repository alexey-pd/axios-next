import { fork, allSettled, serialize } from "effector";
import { useUnit, useGate } from "effector-react";
import {
  $authToken,
  authTokenChanged,
  appInited,
  getFactFx,
  $fact,
  PageGate,
} from "~/shared/model/api";
import Image from "next/image";

const Page = () => {
  const { fact, getFact } = useUnit({ fact: $fact, getFact: getFactFx });
  useGate(PageGate);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 500,
        padding: 20,
        font: "2rem Handjet, cursive",
        margin: "auto",
      }}
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/112/112639.png"
        width={100}
        height={100}
        alt="Stare cat"
      />
      <p className="m-5">{fact}</p>
      <button onClick={getFact} className="px-10 py-2 bg-neutral-300">
        meoww
      </button>
    </div>
  );
};

export default Page;

export async function getServerSideProps() {
  const authToken = "";
  const scope = fork({
    values: [[$authToken, authToken]],
  });

  await allSettled(appInited, { scope });
  await allSettled(getFactFx, { scope });

  await allSettled(authTokenChanged, { scope, params: "token" });
  await allSettled(getFactFx, { scope });

  return {
    props: {
      values: serialize(scope),
    },
  };
}
