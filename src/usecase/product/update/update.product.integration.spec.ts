import {Sequelize} from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'

describe('Test update product use case', () => {
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

    it('should update products', async () => {
        const productRepository = new ProductRepository()
        const usecase = new UpdateProductUseCase(productRepository)

        const product = new Product('123', 'New Product', 12.34)

        await productRepository.create(product)

        const output = {
            id: '123',
            name: 'New Product Updated',
            price: 45.67,
        }

        const result = await usecase.execute(output)

        expect(result).toEqual(output)
    })
})
