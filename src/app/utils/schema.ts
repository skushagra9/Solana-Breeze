import { z } from "zod";

export const InputCheck = z.string().max(50);
