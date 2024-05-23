import { z } from 'zod';

const pet = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required!',
    }),
    species: z.string({
      required_error: 'Species is required!',
    }),
    breed: z.string({
      required_error: 'Breed is required!',
    }),

    age: z.number({
      required_error: 'age is required!',
    }),
    size: z.string({
      required_error: 'Size is required!',
    }),
    location: z.string({
      required_error: 'Location is required!',
    }),
    description: z.string({
      required_error: 'Description is required!',
    }),
    temperament: z.string({
      required_error: 'temperament is required!',
    }),
    medicalHistory: z.string({
      required_error: 'medicalHistory is required!',
    }),
    adoptionRequirements: z.string({
      required_error: 'adoptionRequirements is required!',
    }),
  }),
});

const updatePet = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required!',
      })
      .optional(),
    species: z
      .string({
        required_error: 'Species is required!',
      })
      .optional(),
    breed: z
      .string({
        required_error: 'Breed is required!',
      })
      .optional(),

    age: z
      .number({
        required_error: 'age is required!',
      })
      .optional(),
    size: z
      .string({
        required_error: 'Size is required!',
      })
      .optional(),
    location: z
      .string({
        required_error: 'Location is required!',
      })
      .optional(),
    description: z
      .string({
        required_error: 'Description is required!',
      })
      .optional(),
    temperament: z
      .string({
        required_error: 'temperament is required!',
      })
      .optional(),
    medicalHistory: z
      .string({
        required_error: 'medicalHistory is required!',
      })
      .optional(),
    adoptionRequirements: z
      .string({
        required_error: 'adoptionRequirements is required!',
      })
      .optional(),
  }),
});

export const petValidation = {
  pet,
  updatePet,
};
