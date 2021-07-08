import { Res } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Products } from './entities/products.entity';
import { ProductSize } from './product-size.enum';
import { ProductType } from './product-type.enum';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

const productsList: Products[] = [
  new Products({id: 1, name: 'produto 1', price: 10, type: ProductType.MARMITA, size: ProductSize.PEQUENA, description: 'teste', status: true, image: null, createdAt: new Date(), updatedAt: new Date(), orderToProducts: []}),
  new Products({id: 2, name: 'produto 2', price: 20, type: ProductType.MARMITA, size: ProductSize.MEDIA, description: 'teste', status: true, image: null, createdAt: new Date(), updatedAt: new Date(), orderToProducts: []}),
  new Products({id: 3, name: 'produto 3', price: 30, type: ProductType.MARMITA, size: ProductSize.GRANDE, description: 'teste', status: true, image: null, createdAt: new Date(), updatedAt: new Date(), orderToProducts: []}),
  new Products({id: 4, name: 'produto 4', price: 40, type: ProductType.MARMITA, size: ProductSize.GRANDE, description: 'testando', status: true, image: null, createdAt: new Date(), updatedAt: new Date(), orderToProducts: []}),
];
describe('Register Controller', () => {
  let productController: ProductController;
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn().mockResolvedValue(productsList[0]),
            update: jest.fn().mockResolvedValue(productsList[1]),
            updateStatus: jest.fn(),
            findById: jest.fn().mockResolvedValue(productsList[0]),
            findAll: jest.fn().mockResolvedValue(productsList),
            delete: jest.fn().mockReturnValue(undefined),
            findBySize: jest.fn(),
          }
        }

      ]
    }).compile();

    productController = module.get<ProductController>(ProductController);
    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productController).toBeDefined();
    expect(productService).toBeDefined();
  });

  describe('getAll', () => {
    it('should return a product list successfully', async () => {
      const result = await productService.findAll({});
      expect(result).toEqual(productsList);
    });
  });

  describe('getByID', () => {
    it('should return a product successfully', async () => {
      const result = await productService.findById('1');
      expect(result).toEqual(productsList[0]);
    });
  });

  describe('create', () => {
    it('should create a new todo entity item successfully', async () => {
      
      const result = await productService.create(productsList[0]);

      expect(result).not.toEqual(null);
  
    });

  });

  describe('update', () => {
    it('should update a todo entity item successfully', async () => {
      
      const result = await productService.update( productsList[1], '1');

      expect(result).not.toEqual(null);
    });

  });

  describe('updateStatus', () => {
    it('should updateStatus a todo entity item successfully', async () => {
      
      const result = await productService.updateStatus( "teste body" , "3");

      expect(result).not.toEqual(null);
    });

  });

  describe('Delete', () => {
    it('should Delete a todo entity item successfully', async () => {
      
      const result = await productService.delete( "3");

      expect(result).not.toEqual(null);
    });

  });

  describe('findBySize', () => {
    it('should findBySize a todo entity item successfully', async () => {
      
      const result = await productService.findBySize();

      expect(result).not.toEqual(null);
    });

  });

});
