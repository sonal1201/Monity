import { createClient } from "redis";

const client = await createClient()
  .on("error", err => {
    console.log("Redis client err", err);
  })
  .connect();

type WebsiteEvent = { url: string; id: string };

export async function xAdd({ url, id }: WebsiteEvent) {
  await client.xAdd("monity:website", "*", {
    url,
    id,
  });
}

export async function XAddBulk(websites: WebsiteEvent[]) {
  for (let i = 0; i < websites.length; i++) {
    await xAdd({
      url: websites[i]!.url,
      id: websites[i]!.id,
    });
  }
}
