import { NextFunction, Response, Request } from "express";
import Admin from "../entities/admin.entity";
const checkAdmins = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const result = await Admin.findOne({ where: { id } });
    console.log(result);
    if (!result) {
      return res.status(404).json("Admin not found");
    }
    next();
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

export default checkAdmins;
