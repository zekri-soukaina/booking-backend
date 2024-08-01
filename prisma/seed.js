import { PrismaClient } from "@prisma/client";
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import userData from "../src/data/users.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function seedAmenities() {
  const { amenities } = amenityData;
  for (const amenity of amenities) {
    const existingAmenity = await prisma.amenity.findUnique({
      where: { id: amenity.id },
    });
    if (!existingAmenity) {
      await prisma.amenity.create({
        data: {
          id: amenity.id,
          name: amenity.name,
        },
      });
    }
  }
}

async function seedUsers() {
  const { users } = userData;
  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          username: user.username,
          password: user.password,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture,
        },
      });
    }
  }
}

async function seedHosts() {
  const { hosts } = hostData;
  for (const host of hosts) {
    const existingHost = await prisma.host.findUnique({
      where: { id: host.id },
    });
    if (!existingHost) {
      await prisma.host.create({
        data: {
          id: host.id,
          username: host.username,
          password: host.password,
          name: host.name,
          email: host.email,
          phoneNumber: host.phoneNumber,
          profilePicture: host.profilePicture,
          aboutMe: host.aboutMe,
        },
      });
    }
  }
}

async function seedProperties() {
  const { properties } = propertyData;
  for (const property of properties) {
    const existingProperty = await prisma.property.findUnique({
      where: { id: property.id },
    });
    if (!existingProperty) {
      await prisma.property.create({
        data: {
          id: property.id,
          title: property.title,
          description: property.description,
          location: property.location,
          pricePerNight: property.pricePerNight,
          bedroomCount: property.bedroomCount,
          bathRoomCount: property.bathRoomCount,
          maxGuestCount: property.maxGuestCount,

          host: { connect: { id: property.hostId } },
        },
      });
    }
  }
}
async function seedReviews() {
  const { reviews } = reviewData;
  for (const review of reviews) {
    const existingReview = await prisma.review.findUnique({
      where: { id: review.id },
    });
    if (!existingReview) {
      await prisma.review.create({
        data: {
          id: review.id,
          rating: review.rating,
          comment: review.comment,

          user: { connect: { id: review.userId } },
          property: { connect: { id: review.propertyId } },
        },
      });
    }
  }
}

async function seedBookings() {
  const { bookings } = bookingData;
  for (const booking of bookings) {
    const existingBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
    });
    if (!existingBooking) {
      await prisma.booking.create({
        data: {
          id: booking.id,
          checkinDate: booking.checkinDate,
          checkoutDate: booking.checkoutDate,
          numberOfGuests: booking.numberOfGuests,
          totalPrice: booking.totalPrice,
          bookingStatus: booking.bookingStatus,

          user: { connect: { id: booking.userId } },
          property: { connect: { id: booking.propertyId } },
        },
      });
    }
  }
}

async function main() {
  try {
    await seedAmenities();
    await seedUsers();
    await seedHosts();
    await seedProperties();
    await seedReviews();
    await seedBookings();
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
