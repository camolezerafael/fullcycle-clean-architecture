import {Sequelize} from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'
import {InputCreateProductDto} from './create.product.dto'
import {validate} from 'uuid'

describe('Test create product use case', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: {force: true},
        })

        await sequelize.addModels([ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a product type "a"', async () => {
        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            type: 'a',
            name: 'New Product',
            price: 12.34,
        }

        const output = {
            name: 'New Product',
            price: 12.34,
        }

        const result = await usecase.execute(input as InputCreateProductDto)

        expect(validate(result.id)).toBeTruthy()
        expect(result.name).toEqual(output.name)
        expect(result.price).toEqual(output.price)
    })

    it('should create a product type "b"', async () => {
        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository)

        const input = {
            type: 'b',
            name: 'New Product',
            price: 12.34,
        }

        const output = {
            name: 'New Product',
            price: 12.34*2,
        }

        const result = await usecase.execute(input as InputCreateProductDto)

        expect(validate(result.id)).toBeTruthy()
        expect(result.name).toEqual(output.name)
        expect(result.price).toEqual(output.price)
    })
})
