import { Router } from 'express';
import UFController from '../controllers/UFController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const ufRouter = Router();
const ufController = new UFController();

/**
 * @swagger
 * components:
 *   schemas:
 *     UF:
 *       type: object
 *       properties:
 *         codigoUF:
 *           type: number
 *           default: 1
 *         sigla:
 *           type: string
 *           default: SP
 *         nome:
 *           type: string
 *           default: São Paulo
 *         status:
 *           type: number
 *           default: 1
 *
 *     UFS:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/UF'
 */

ufRouter.use(isAuthenticated);

/**
 * @openapi
 * /uf:
 *  get:
 *     tags:
 *     - UF
 *     summary: Registrar uma UF
 *     parameters:
 *      - name: codigoUF
 *        in: url
 *        description: o codigo da UF
 *        required: false
 *      - name: sigla
 *        in: url
 *        description: a sigla da UF
 *        required: false
 *      - name: nome
 *        in: url
 *        description: o nome da UF
 *        required: false
 *      - name: status
 *        in: url
 *        description: o status da UF
 *        required: false
 *     description: Listar as UFS
 *     responses:
 *       200:
 *         description: Encontrou com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UFS'
 */
ufRouter.get('/', ufController.index);

/**
 * @openapi
 * '/uf':
 *  post:
 *     tags:
 *     - UF
 *     summary: Registrar uma UF
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              CreateUserInput:
 *                type: object
 *                required:
 *                  - sigla
 *                  - nome
 *                  - status
 *              properties:
 *                sigla:
 *                  type: string
 *                  default: SP
 *                nome:
 *                  type: string
 *                  default: São Paulo
 *                status:
 *                  type: number
 *                  default: 1
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UFS'
 *      400:
 *        description: Bad request
 */
ufRouter.post('/', ufController.create);

/**
 * @openapi
 * '/uf':
 *  put:
 *     tags:
 *     - UF
 *     summary: Atualizar uma UF
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              UpdateUFInput:
 *                type: object
 *                required:
 *                  - codigoUF
 *                  - sigla
 *                  - nome
 *                  - status
 *              properties:
 *                codigoUF:
 *                  type: string
 *                  default: SP
 *                sigla:
 *                  type: string
 *                  default: SP
 *                nome:
 *                  type: string
 *                  default: São Paulo
 *                status:
 *                  type: number
 *                  default: 1
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UFS'
 *      400:
 *        description: Bad request
 */
ufRouter.put('/', ufController.update);

/**
 * @openapi
 * 'uf/{codigoUF}':
 *  delete:
 *     tags:
 *     - UF
 *     summary: Deletar uma UF pelo codigo
 *     parameters:
 *      - name: codigoUF
 *        in: path
 *        description: O codigo da UF
 *        required: true
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: UF não encontrada
 */
ufRouter.delete('/:codigoUF', ufController.delete);

export default ufRouter;
