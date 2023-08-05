import { fork, allSettled, serialize } from "effector";
import { useUnit } from "effector-react";
import {
  $authToken,
  authTokenChanged,
  appInited,
  getFactFx,
  $fact,
} from "../../api";
import Image from "next/image";

const Page = () => {
  const { fact } = useUnit({ fact: $fact });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 500,
        padding: 20,
        font: "22px Borel, cursive",
        margin: "auto",
      }}
    >
      <Image
        src="https://cdn-icons-png.flaticon.com/512/112/112639.png"
        width={100}
        height={100}
        alt="Stare cat"
      />
      <p>{fact}</p>
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
