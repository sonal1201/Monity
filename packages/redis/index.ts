import { createClient } from "redis";

const client = await createClient()
  .on("error", err => {
    console.log("Redis client err", err);
  })
  .connect();

type WebsiteEvent = { url: string; id: string };

const STREAM_NAME = "monity:website";

async function xAdd({ url, id }: WebsiteEvent) {
  await client.xAdd(STREAM_NAME, "*", {
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

export async function XReadGroup(
  consumerGroup: string,
  workerId: string
): Promise<any> {
  const res = await client.XREADGROUP(
    consumerGroup,
    workerId,
    {
      key: STREAM_NAME,
      id: ">",
    },
    {
      COUNT: 5,
    }
  );
  return res;
}

export async function xAck(cosnsumerGroup: string, StreamId: string) {
  const res = await client.xAck(STREAM_NAME, cosnsumerGroup, StreamId);

  return res;
}
