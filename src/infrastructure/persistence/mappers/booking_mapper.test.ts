import { BookingMapper } from "./booking_mapper";
import { Booking } from "../../../domain/entities/booking";
import { BookingEntity } from "../entities/booking_entity";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";

const createMockProperty = () => {
  const property = new Property("prop-1", "Casa Praia", "Desc", 5, 100);
  property.isAvailable = jest.fn().mockReturnValue(true);
  property.calculateTotalPrice = jest.fn().mockReturnValue(500);
  property.addBooking = jest.fn();
  return property;
};

const createMockUser = () => new User("user-1", "João Silva");

describe("BookingMapper", () => {
  const mockProperty = createMockProperty();
  const mockGuest = createMockUser();
  const startDate = new Date("2026-01-10");
  const endDate = new Date("2026-01-15");

  it("deve converter BookingEntity em Booking corretamente", () => {
    const entity = new BookingEntity();
    entity.id = "book-123";
    entity.guestCount = 2;
    entity.totalPrice = 500;
    entity.status = "CONFIRMED";
    entity.startDate = startDate;
    entity.endDate = endDate;

    entity.guest = { id: "user-1", name: "João Silva" } as UserEntity;
    entity.property = { id: "prop-1", name: "Casa Praia" } as PropertyEntity;

    const domain = BookingMapper.toDomain(entity, mockProperty);

    expect(domain).toBeInstanceOf(Booking);
    expect(domain.getId()).toBe(entity.id);
    expect(domain.getGuestCount()).toBe(entity.guestCount);
    expect(domain.getTotalPrice()).toBe(entity.totalPrice);
    expect(domain.getStatus()).toBe("CONFIRMED");
    expect(domain.getDateRange().getStartDate()).toEqual(startDate);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const entity = new BookingEntity();
    entity.id = "book-123";
    entity.guestCount = 0;
    entity.startDate = startDate;
    entity.endDate = endDate;
    entity.guest = { id: "user-1", name: "João Silva" } as UserEntity;

    expect(() => {
      BookingMapper.toDomain(entity, mockProperty);
    }).toThrow("O número de hóspedes deve ser maior que zero.");
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const dateRange = new DateRange(startDate, endDate);
    const booking = new Booking(
      "book-999",
      mockProperty,
      mockGuest,
      dateRange,
      3
    );

    const entity = BookingMapper.toPersistence(booking);

    expect(entity).toBeInstanceOf(BookingEntity);
    expect(entity.id).toBe("book-999");
    expect(entity.guestCount).toBe(3);
    expect(entity.status).toBe("CONFIRMED");
    expect(entity.totalPrice).toBe(500);
    expect(entity.startDate).toEqual(startDate);
    expect(entity.endDate).toEqual(endDate);
  });
});