import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import { $authToken, authTokenChanged } from "~/shared/model/api";
import { pageInited } from "~/shared/model/page";
import { readFactFired, readFactFx, $fact } from "~/shared/model/fact";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

const Page = () => {
  const { fact, readFact, disabled } = useUnit({
    fact: $fact,
    readFact: readFactFired,
    disabled: readFactFx.pending,
  });

  const debounced = useDebouncedCallback(() => {
    readFact();
  }, 1000);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 500,
        padding: 20,
        font: "2rem Handjet, cursive",
        margin: "auto",
        height: "100%",
      }}
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/112/112639.png"
        width={100}
        height={100}
        alt="Stare cat"
      />
      <button
        onClick={debounced}
        disabled={disabled}
        className="px-10 py-2 mt-5 bg-neutral-300"
      >
        meoww
      </button>
      <p className="m-10">{fact}</p>
    </div>
  );
};

export default Page;

export async function getServerSideProps() {
  const authToken = "";
  const scope = fork({
    values: [[$authToken, authToken]],
  });

  await allSettled(pageInited, { scope });
  await allSettled(readFactFired, { scope });

  await allSettled(authTokenChanged, { scope, params: "token" });
  await allSettled(readFactFired, { scope });

  const values = serialize(scope);

  console.log("values", values);

  return {
    props: {
      values,
    },
  };
}
