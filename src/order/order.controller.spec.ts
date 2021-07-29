import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Orders } from './entities/orders.entity';
import { OrderStatus } from './order-status.enum';

const orderList: Orders[] = [
  new Orders({
    id: 1,
    client_name: "Jão",
    phone: "4002",
    cep: "12236",
    address_street: "rua",
    address_number: 0,
    address_neighborhood: "morumbi",
    address_city: "Sampa",
    cost_freight: 1.3,
    payment: "dinheiro",
    withdrawal: "50 conto",
    status: OrderStatus.ANDAMENTO,
    reference_point: "Ao lado do estadio",
    change_of_money: 2.5,
    total: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
    orderToProducts: [],
  })
];


describe('Order Controller', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  const mockRepository = {
    create: jest.fn(),
    update: jest.fn(),
    updateStatus: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    findPaged: jest.fn(),
  };
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Orders),
          useValue: { mockRepository },
        },
      ],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.update.mockReset();
    mockRepository.updateStatus.mockReset();
    mockRepository.findAll.mockReset();
    mockRepository.findById.mockReset();
    mockRepository.findPaged.mockReset();
  });

  it('should be defined', () => {
    expect( orderController).toBeDefined();
    expect(orderService).toBeDefined();
  });
});
