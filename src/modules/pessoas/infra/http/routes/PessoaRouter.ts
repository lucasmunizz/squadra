import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const pessoaRouter = Router();
const pessoaController = new PessoaController();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pessoa:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           default: Lucas
 *         sobrenome:
 *           type: string
 *           default: Muniz
 *         idade:
 *           type: number
 *           default: 19
 *         login:
 *           type: string
 *           default: lucasmunizz
 *         senha:
 *           type: string
 *           default: 123456
 *         status:
 *           type: number
 *           default: 1
 *         enderecos:
 *           type: array
 *           items:
 *            type: object
 *            properties:
 *             ...:
 *              type: string
 *              default: ...
 *
 *
 *     Pessoas:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Pessoa'
 */

/**
 * @openapi
 * /pessoa:
 *  get:
 *     tags:
 *     - Pessoa
 *     summary: Listar Pessoa
 *     parameters:
 *      - name: codigoPessoa
 *        in: url
 *        description: o codigo do Municipio
 *        required: false
 *      - name: login
 *        in: url
 *        description: o login da Pessoa
 *        required: false
 *      - name: status
 *        in: url
 *        description: o status da Pessoa
 *        required: false
 *     description: Listar as Pessoas
 *     responses:
 *       200:
 *         description: Encontrou com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Pessoas'
 */
pessoaRouter.get('/', pessoaController.index);

/**
 * @openapi
 * '/pessoa':
 *  post:
 *     tags:
 *     - Pessoa
 *     summary: Registrar uma Pessoa
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              CreatePessoaInput:
 *                type: object
 *                required:
 *                  - nome
 *                  - sobrenome
 *                  - idade
 *                  - login
 *                  - senha
 *                  - status
 *                  - enderecos
 *              properties:
 *                nome:
 *                  type: string
 *                  default: Lucas
 *                sobrenome:
 *                  type: string
 *                  default: Muniz
 *                idade:
 *                  type: number
 *                  default: 19
 *                login:
 *                  type: string
 *                  default: lucasmunizz
 *                senha:
 *                  type: string
 *                  default: 123456
 *                status:
 *                  type: number
 *                  default: 1
 *                enderecos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      codigoBairro:
 *                        type: number
 *                        default: 1
 *                      nomeRua:
 *                        type: string
 *                        default: avenida ibirapuera
 *                      numero:
 *                        type: string
 *                        default: 123
 *                      complemento:
 *                        type: string
 *                        default: complemento
 *                      cep:
 *                        type: string
 *                        default: 06756-400
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Pessoas'
 *      400:
 *        description: Bad request
 */
pessoaRouter.post('/', pessoaController.create);

/**
 * @openapi
 * '/pessoa':
 *  put:
 *     tags:
 *     - Pessoa
 *     summary: Atualizar uma Pessoa
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              CreatePessoaInput:
 *                type: object
 *                required:
 *                  - codigoPessoa
 *                  - nome
 *                  - sobrenome
 *                  - idade
 *                  - login
 *                  - senha
 *                  - status
 *                  - enderecos
 *              properties:
 *                codigoPessoa:
 *                  type: nuumber
 *                  default: 1
 *                nome:
 *                  type: string
 *                  default: Lucas
 *                sobrenome:
 *                  type: string
 *                  default: Muniz
 *                idade:
 *                  type: number
 *                  default: 19
 *                login:
 *                  type: string
 *                  default: lucasmunizz
 *                senha:
 *                  type: string
 *                  default: 123456
 *                status:
 *                  type: number
 *                  default: 1
 *                enderecos:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      codigoEndereco:
 *                        type: number
 *                        default: 1
 *                      codigoPessoa:
 *                        type: number
 *                        default: 1
 *                      codigoBairro:
 *                        type: number
 *                        default: 1
 *                      nomeRua:
 *                        type: string
 *                        default: avenida ibirapuera
 *                      numero:
 *                        type: string
 *                        default: 123
 *                      complemento:
 *                        type: string
 *                        default: complemento
 *                      cep:
 *                        type: string
 *                        default: 06756-400
 *     responses:
 *      200:
 *        description: Sucesso
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Pessoas'
 *      400:
 *        description: Bad request
 */
pessoaRouter.put('/', pessoaController.update);

/**
 * @openapi
 * 'pessoa/{codigoPessoa}':
 *  delete:
 *     tags:
 *     - Pessoa
 *     summary: Deletar uma Pessoa pelo codigo
 *     parameters:
 *      - name: codigoPessoa
 *        in: path
 *        description: O codigo da Pessoa
 *        required: true
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: UF não encontrada
 */
pessoaRouter.delete('/:codigoPessoa', pessoaController.delete);

export default pessoaRouter;
