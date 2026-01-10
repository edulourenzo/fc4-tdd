import { Request, Response, NextFunction } from "express";
import { UserService } from "../../application/services/user_service";

export class UserController {
  constructor(private readonly userService: UserService) { }

  async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).json({ message: "O campo nome é obrigatório." });
        return;
      }

      const user = await this.userService.createUser(name);

      res.status(201).json({
        id: user.getId(),
        name: user.getName(),
      });
    } catch (error) {
      next(error);
    }
  }
}