import jwt, { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';
import { AdoptionRequest, Prisma } from '@prisma/client';
import { AdoptionRequestCreateInput } from './adoption.validation';

//pet adoption
interface AdoptionPetData {
  petId?: string;
  petOwnershipExperience?: string;
  // Add other properties if necessary
}
const adoptionPet = async (token: string, data: AdoptionPetData) => {
  const decoded = jwt.verify(token, 'access') as JwtPayload;
  const email = decoded.email;
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  const adoptionData: AdoptionRequestCreateInput = {
    userId: findUser?.id,
    petId: data?.petId,
    status: 'PENDING',
    petOwnershipExperience: data.petOwnershipExperience,
  };
  const result = await prisma.adoptionRequest.create({
    data: adoptionData as Prisma.AdoptionRequestCreateInput,
  });
  return result;
};

//get all pet adoption

const getalladoption = async () => {
  const result = await prisma.adoptionRequest.findMany();
  return result;
};

//update adoption

const updateAdoption = async (id: string, data: Partial<AdoptionRequest>) => {
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id: id,
    },
    data: data,
    select: {
      id: true,
      userId: true,
      petId: true,
      status: true,
      petOwnershipExperience: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};
export const adoptionServices = {
  adoptionPet,
  getalladoption,
  updateAdoption,
};
