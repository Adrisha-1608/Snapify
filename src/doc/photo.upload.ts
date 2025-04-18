/**
 * @swagger
 * tags:
 *   name: Upload
 *   description: Photo Upload related APIs
 */

/**
 * @swagger
 * /upload/photo:
 *   post:
 *     summary: Upload a single photo
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Photo uploaded successfully
 *       400:
 *         description: Bad Request
 */

/**
 * @swagger
 * /upload/photos:
 *   post:
 *     summary: Upload multiple photos
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Photos uploaded successfully
 *       400:
 *         description: Bad Request
 */
