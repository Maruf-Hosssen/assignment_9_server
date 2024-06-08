"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petValidation = void 0;
const zod_1 = require("zod");
const pet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required!',
        }),
        photo: zod_1.z.string({
            required_error: 'Photo is required!',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required!',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required!',
        }),
        breed: zod_1.z.string({
            required_error: 'Breed is required!',
        }),
        gender: zod_1.z.string({
            required_error: 'Gender is required!',
        }),
        healthStatus: zod_1.z.string({
            required_error: 'Health status is required!',
        }),
        currentLocation: zod_1.z.string().optional(),
    }), // Make currentLocation optional since it has a default value in Prisma
});
const updatePet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: 'Name is required!',
        })
            .optional(),
        species: zod_1.z
            .string({
            required_error: 'Species is required!',
        })
            .optional(),
        breed: zod_1.z
            .string({
            required_error: 'Breed is required!',
        })
            .optional(),
        age: zod_1.z
            .number({
            required_error: 'age is required!',
        })
            .optional(),
        size: zod_1.z
            .string({
            required_error: 'Size is required!',
        })
            .optional(),
        location: zod_1.z
            .string({
            required_error: 'Location is required!',
        })
            .optional(),
        description: zod_1.z
            .string({
            required_error: 'Description is required!',
        })
            .optional(),
        temperament: zod_1.z
            .string({
            required_error: 'temperament is required!',
        })
            .optional(),
        medicalHistory: zod_1.z
            .string({
            required_error: 'medicalHistory is required!',
        })
            .optional(),
        adoptionRequirements: zod_1.z
            .string({
            required_error: 'adoptionRequirements is required!',
        })
            .optional(),
    }),
});
exports.petValidation = {
    pet,
    updatePet,
};
