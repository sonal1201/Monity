import { prismaclient } from "db/client";
import { XAddBulk } from "redisstream/client";

async function main() {
  let website = await prismaclient.website.findMany({
    select: {
      url: true,
      id: true,
    },
  });

  console.log(website.length);
  await XAddBulk(
    website.map(w => ({
      url: w.url,
      id: w.id,
    }))
  );
}

setInterval(() => {
  main();
}, 3 * 1000);
