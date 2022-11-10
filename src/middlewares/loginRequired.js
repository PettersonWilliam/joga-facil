import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ["Login required"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);

    if(!id || !email) {
      return res.status(401).json({
        errors: ["Token inválido"],
      });
    }

    const user = await User.findOne({
      where: {
        id,
        email,
        deleted_at: null
      },
      paranoid: false
    });

    if (!user) {
      return res.status(401).json({
        errors: ["Token expirado ou invalido."],
      });
    }

    req.userId = id;
    req.userEmail = email;
    next();
  } catch (e) {
    return res.status(401).json({
      errors: ["Token expirado ou invalido."],
    });
  }
};
