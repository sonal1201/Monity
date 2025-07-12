import type { Request, Response } from "express";
import { AuthInput } from "../types/user-types";
import { prismaclient } from "db/client";

import jwt from "jsonwebtoken";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userdata = AuthInput.safeParse(req.body);

  try {
    if (!userdata.success) {
      res.status(400).send({
        message: "Please provide valid input",
      });
      return;
    }

    await prismaclient.user.create({
      data: {
        username: userdata.data.username,
        gmail: userdata.data.gmail,
        password: userdata.data.password,
      },
    });

    res.status(200).json({
      message: "User Created sucessfully",
      data: {
        userdata: userdata.data.username,
        gmail: userdata.data.gmail,
      },
    });
  } catch (error) {
    console.error("Sign-up error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const signinUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const signinData = AuthInput.safeParse(req.body);

  try {
    if (!signinData.success) {
      res.status(400).send({
        message: "Please provide vaild credentials",
      });
      return;
    }
    const { username, gmail, password } = signinData.data;
    const findUser = await prismaclient.user.findFirst({
      where: {
        OR: [
          { username: username || undefined },
          { gmail: gmail || undefined },
        ],
      },
    });

    if (!findUser) {
      res.status(404).json({
        message: "please register youself user not found",
      });
      return;
    }
    if (findUser.password !== password) {
      res.status(400).json({
        message: "Incorrect password",
      });
      return;
    }
    
    //jwt sign
    const userjwt = jwt.sign(findUser.id, process.env.secret_password!);

    res.status(200).json({
      message: "Login sucessfully",
      data: {
        jwt: userjwt,
        id: findUser.id,
        ...(findUser.username
          ? { username: findUser.username }
          : { gmail: findUser.gmail }),
      },
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
