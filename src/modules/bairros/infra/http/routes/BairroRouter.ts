import { Router } from 'express';
import BairroController from '../controllers/BairroController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const bairroRouter = Router();
const bairroController = new BairroController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bairro:
 *       type: object
 *       properties:
 *         codigoBairro:
 *           type: number
 *           default: 1
 *         codigoMunicipio:
 *           type: number
 *           default: 1
 *         nome:
 *           type: string
 *           default: Pinheiros
 *         status:
 *           type: number
 *           default: 1
 *
 *     Bairros:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Bairro'
 */

bairroRouter.use(isAuthenticated);

/**
 * @openapi
 * /bairro:
 *  get:
 *     tags:
 *     - Bairro
 *     summary: Listar Bairro
 *     parameters:
 *      - name: codigoBairro
 *        in: url
 *        description: o codigo do Bairro
 *        required: false
 *      - name: codigoMunicipio
 *        in: url
 *        description: o codigo do Municipio
 *        required: false
 *      - name: nome
 *        in: url
 *        description: o nome do Bairro
 *        required: false
 *      - name: status
 *        in: url
 *        description: o status do Bairro
 *        required: false
 *     description: Listar os Bairros
 *     responses:
 *       200:
 *         description: Encontrou com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bairros'
 */
bairroRouter.get('/', bairroController.index);

/**
 * @openapi
 * '/bairro':
 *  post:
 *     tags:
 *     - Bairro
 *     summary: Registrar um Bairro
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              CreateBairroInput:
 *                type: object
 *                required:
 *                  - codigoMunicipio
 *                  - nome
 *                  - status
 *              properties:
 *                codigoMunicipio:
 *                  type: number
 *                  default: 1
 *                nome:
 *                  type: string
 *                  default: Pinheiros
 *                status:
 *                  type: number
 *                  default: 1
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bairros'
 *      400:
 *        description: Bad request
 */
bairroRouter.post('/', bairroController.create);

/**
 * @openapi
 * '/bairro':
 *  put:
 *     tags:
 *     - Bairro
 *     summary: Atualizar um Bairro
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              UpdateBairroInput:
 *                type: object
 *                required:
 *                  - codigoBairro
 *                  - codigoMunicipio
 *                  - nome
 *                  - status
 *              properties:
 *                codigoBairro:
 *                  type: number
 *                  default: 1
 *                codigoMunicipio:
 *                  type: number
 *                  default: 1
 *                nome:
 *                  type: string
 *                  default: Pinheiros
 *                status:
 *                  type: number
 *                  default: 1
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bairros'
 *      400:
 *        description: Bad request
 */
bairroRouter.put('/', bairroController.update);

/**
 * @openapi
 * 'bairro/{codigoBairro}':
 *  delete:
 *     tags:
 *     - Bairro
 *     summary: Deletar um Bairro pelo codigo
 *     parameters:
 *      - name: codigoBairro
 *        in: path
 *        description: O codigo do Bairro
 *        required: true
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *         description: Bairro não encontrado
 */
bairroRouter.delete('/:codigoBairro', bairroController.delete);

export default bairroRouter;
