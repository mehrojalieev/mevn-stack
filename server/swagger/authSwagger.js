/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 description: Enter your firstname
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 description: Enter your lastname
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 description: Enter your email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: Enter password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The user ID
 *                 firstname:
 *                   type: string
 *                   description: The user's firstname
 *                 lastname:
 *                   type: string
 *                   description: The user's lastname
 *                 email:
 *                   type: string
 *                   description: The user's email
 *                 password:
 *                   type: string
 *                   description: Password
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the user was created
 *       400:
 *         description: Validation error or email already exists
 *       500:
 *         description: Server error
 */



/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                 message:
 *                   type: string
 *                   description: Login success message
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error
 */

// AUTH LOGIN

/**
 * @swagger
 * /api/auth/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *           
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
