const { z } = require('zod');

const registerSchema = z.object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(6),
});

// Schema for user login
const loginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6),
}).or('username', 'email');

const userIdSchema = z.object({
    userId: z.string().min(1)
});
module.exports = { registerSchema, loginSchema, userIdSchema };
