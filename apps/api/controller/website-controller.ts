import type { Request, Response } from "express";
import { prismaclient } from "db/client";

export const addWebsite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { url } = req.body.url;
  try {
    if (!url) {
      res.status(401).json({
        message: "Please provide url",
      });
      return;
    }

    await prismaclient.website.create({
      data: {
        url,
        userId: req.userid!,
      },
    });

    res.status(200).json({
      message: "website added sucessfully",
      data: url,
    });
  } catch (error) {
    console.error("website url error-", error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

export const websiteStatus = async (req: Request, res: Response) => {
  try {
    const webData = await prismaclient.website.findFirst({
      where: {
        userId: req.userid!,
        id: req.params.id,
      },
      include: {
        ticks: {
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
          take: 1,
        },
      },
    });

    if (!webData) {
      res.status(409).json({
        message: "Website not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: "Internal server error",
    });
  }
};
