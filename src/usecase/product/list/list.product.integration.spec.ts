import {Sequelize} from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ListProductUseCase from './list.product.usecase'

describe('Test list products use case', () => {
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

    it('should list products', async () => {
        const productRepository = new ProductRepository()
        const usecase = new ListProductUseCase(productRepository)

        const product = new Product('123', 'New Product', 12.34)
        const product2 = new Product('234', 'New Product 2', 23.45)

        await productRepository.create(product)
        await productRepository.create(product2)

        const output = [
            {
                id: '123',
                name: 'New Product',
                price: 12.34,
            },
            {
                id: '234',
                name: 'New Product 2',
                price: 23.45,
            }]

        const result = await usecase.execute()

        expect(result.products).toEqual(output)
    })
})
