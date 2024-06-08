import { Pet } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { petFilterRequest } from './pet.interface';
import { TPaginationOptions } from '../../interface/pagination';
import { paginationHelper } from '../../../shared/paginationHelpers';
import { petSearchableFields } from './pet.constant';

//add pet

const addPet = async (data: any) => {
  const result = await prisma.pet.create({
    data: data,
  });
  return result;
};

//update pet

const updatePet = async (id: string, data: Partial<Pet>) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: id,
    },
    data: data,
  });
  return result;
};

//get all pets

const getAllPets = async (
  params: petFilterRequest,
  options: TPaginationOptions,
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = params;
  const addcondition = [];
  if (params.searchTerm) {
    addcondition.push({
      OR: petSearchableFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    addcondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition = { AND: addcondition };
  const result = await prisma.pet.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.pet.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

//get single pet
const getSinglePet = async (id: string) => {
  try {
    const res = await prisma.pet.findUnique({
      where: {
        id: id,
      },
    });

    return res;
  } catch (err) {
    console.log(err);
  }
};
export const petServices = {
  addPet,
  updatePet,
  getAllPets,
  getSinglePet,
};
