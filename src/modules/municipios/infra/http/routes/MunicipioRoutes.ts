import { Router } from 'express';
import MunicipioController from '../controllers/MunicipioController';
import isAuthenticated from '../../../../../shared/http/middlewares/isAuthenticated';

const municipioRouter = Router();
const municipioController = new MunicipioController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Municipio:
 *       type: object
 *       properties:
 *         codigoMunicipio:
 *           type: number
 *           default: 1
 *         codigoUF:
 *           type: number
 *           default: 1
 *         nome:
 *           type: string
 *           default: São Paulo
 *         status:
 *           type: number
 *           default: 1
 *
 *     Municipios:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Municipio'
 */

municipioRouter.use(isAuthenticated);

/**
 * @openapi
 * /municipio:
 *  get:
 *     tags:
 *     - Municipio
 *     summary: Listar Municipio
 *     parameters:
 *      - name: codigoMunicipio
 *        in: url
 *        description: o codigo do Municipio
 *        required: false
 *      - name: codigoUF
 *        in: url
 *        description: o codigo da UF
 *        required: false
 *      - name: nome
 *        in: url
 *        description: o nome do Municipio
 *        required: false
 *      - name: status
 *        in: url
 *        description: o status do Municpio
 *        required: false
 *     description: Listar os Municipios
 *     responses:
 *       200:
 *         description: Encontrou com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Municipios'
 */
municipioRouter.get('/', municipioController.index);

/**
 * @openapi
 * '/municipio':
 *  post:
 *     tags:
 *     - Municipio
 *     summary: Registrar um Municipio
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              CreateMunicipioInput:
 *                type: object
 *                required:
 *                  - codigoUF
 *                  - nome
 *                  - status
 *              properties:
 *                codigoUF:
 *                  type: number
 *                  default: 1
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
 *              $ref: '#/components/schemas/Municipios'
 *      400:
 *        description: Bad request
 */
municipioRouter.post('/', municipioController.create);

/**
 * @openapi
 * '/municipio':
 *  put:
 *     tags:
 *     - Municipio
 *     summary: Atualizar um Municipio
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              UpdateMunicipioInput:
 *                type: object
 *                required:
 *                  - codigoMunicipio
 *                  - codigoUF
 *                  - nome
 *                  - status
 *              properties:
 *                codigoMunicipio:
 *                  type: number
 *                  default: 1
 *                codigoUF:
 *                  type: number
 *                  default: 1
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
 *              $ref: '#/components/schemas/Municipios'
 *      400:
 *        description: Bad request
 */
municipioRouter.put('/', municipioController.update);

/**
 * @openapi
 * 'municipio/{codigoMunicipio}':
 *  delete:
 *     tags:
 *     - Municipio
 *     summary: Deletar um Municipio pelo codigo
 *     parameters:
 *      - name: codigoMunicipio
 *        in: path
 *        description: O codigo do Municipio
 *        required: true
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Municipio não encontrado
 */
municipioRouter.delete('/:codigoMunicipio', municipioController.delete);

export default municipioRouter;
