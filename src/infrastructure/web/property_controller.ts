import { Request, Response } from "express";
import { PropertyService } from "../../application/services/property_service";

export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description, maxGuests, basePricePerNight } = req.body;

      // Validação de campos obrigatórios (nível HTTP/DTO)
      if (basePricePerNight === undefined || basePricePerNight === null) {
        return res.status(400).json({ message: "O preço base por noite é obrigatório." });
      }

      const property = await this.propertyService.createProperty(
        name,
        description,
        maxGuests,
        basePricePerNight
      );

      return res.status(201).json({
        message: "Propriedade criada com sucesso",
        property: {
          id: property.getId(),
          name: property.getName(),
          description: property.getDescription(),
          maxGuests: property.getMaxGuests(),
          basePricePerNight: property.getBasePricePerNight(),
        },
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}