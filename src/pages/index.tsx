import { fork, allSettled, serialize } from "effector";
import { $authToken, appInited, requestFx } from "../../api";

const Page = () => <p>page</p>;

export default Page;

export async function getServerSideProps() {
  const scope = fork({
    values: [[$authToken, "server token"]],
  });

  await allSettled(appInited, { scope });
  await allSettled(requestFx, { scope });
  return {
    props: {
      values: serialize(scope),
    },
  };
}
