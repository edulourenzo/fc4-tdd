import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("Property Mapper Entity", () => {
  const propertyData = {
    id: "uuid-123",
    name: "Casa de Praia",
    description: "Uma bela casa de frente para o mar",
    maxGuests: 6,
    basePricePerNight: 150.50,
  };

  it("deve converter PropertyEntity em Property corretamente", () => {
    // Arrange
    const entity = new PropertyEntity();
    entity.id = propertyData.id;
    entity.name = propertyData.name;
    entity.description = propertyData.description;
    entity.maxGuests = propertyData.maxGuests;
    entity.basePricePerNight = propertyData.basePricePerNight.toString() as any;

    // Act
    const domain = PropertyMapper.toDomain(entity);

    // Assert
    expect(domain).toBeInstanceOf(Property);
    expect(domain.getId()).toBe(propertyData.id);
    expect(domain.getName()).toBe(propertyData.name);
    expect(domain.getDescription()).toBe(propertyData.description);
    expect(domain.getMaxGuests()).toBe(propertyData.maxGuests);
    expect(domain.getBasePricePerNight()).toBe(propertyData.basePricePerNight);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    // Arrange
    const entity = new PropertyEntity();
    entity.id = "uuid-123";
    entity.name = ""; // Campo obrigatório vazio
    entity.description = "Descrição qualquer";
    entity.maxGuests = 5;
    entity.basePricePerNight = 100;

    // Act & Assert
    // O mapper chama o construtor de Property, que deve lançar o erro
    expect(() => {
      PropertyMapper.toDomain(entity);
    }).toThrow("O nome da propriedade é obrigatório.");
  });

  it("deve lançar erro quando o número máximo de hóspedes for inválido na entidade", () => {
    // Arrange
    const entity = new PropertyEntity();
    entity.id = "uuid-123";
    entity.name = "Casa Válida";
    entity.maxGuests = 0;

    // Act & Assert
    expect(() => {
      PropertyMapper.toDomain(entity);
    }).toThrow("A capacidade máxima deve ser maior que zero.");
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    // Arrange
    const domain = new Property(
      propertyData.id,
      propertyData.name,
      propertyData.description,
      propertyData.maxGuests,
      propertyData.basePricePerNight
    );

    // Act
    const entity = PropertyMapper.toPersistence(domain);

    // Assert
    expect(entity).toBeInstanceOf(PropertyEntity);
    expect(entity.id).toBe(domain.getId());
    expect(entity.name).toBe(domain.getName());
    expect(entity.description).toBe(domain.getDescription());
    expect(entity.maxGuests).toBe(domain.getMaxGuests());
    expect(entity.basePricePerNight).toBe(domain.getBasePricePerNight());
  });
});