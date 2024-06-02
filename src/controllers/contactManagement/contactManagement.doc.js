/**
 * @swagger
 * /identify:
 *   post:
 *     tags:
 *      - Contact Details
 *     summary: Contact Details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address
 *                 example: abc@gmail.com
 *                 required: true
 *               phoneNumber:
 *                 type: number
 *                 description: phone number of customer
 *                 example: 9810902728
 *                 required: true
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: successful.
 *                       example: successful.
*/
