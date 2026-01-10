import { Property } from "../../domain/entities/property";
import { PropertyRepository } from "../../domain/repositories/property_repository";
import { v4 as uuidv4 } from "uuid";

export class PropertyService {
  constructor(private readonly propertyRepository: PropertyRepository) { }

  async findPropertyById(id: string): Promise<Property | null> {
    return this.propertyRepository.findById(id);
  }

  async createProperty(
    name: string,
    description: string,
    maxGuests: number,
    basePricePerNight: number
  ): Promise<Property> {
    const id = uuidv4();
    const property = new Property(
      id,
      name,
      description,
      maxGuests,
      basePricePerNight
    );
    await this.propertyRepository.save(property);
    return property;
  }
}