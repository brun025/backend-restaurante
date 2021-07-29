import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { getRepositoryToken } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';

const usersList: Users[] = [
  new Users({
    id: 1,
    name: "Igor",
    username: "Igorczl",
    email: "aaa@gmail.com",
    password: "12345",
    role: "adasd",
    createdAt: new Date(),
    updatedAt: new Date(),
  })
];


describe("Users Controller", () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockRepository = {
    findByEmail: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    updateByEmail: jest.fn(),
    updateByPassword: jest.fn(),
    updateProfileUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: { mockRepository },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  beforeEach(() => {
    mockRepository.findByEmail.mockReset();
    mockRepository.findAll.mockReset();
    mockRepository.findById.mockReset();
    mockRepository.create.mockReset();
    mockRepository.updateByEmail.mockReset();
    mockRepository.updateByPassword.mockReset();
    mockRepository.updateProfileUser.mockReset();
    mockRepository.updateProfileUser.mockReset();
    mockRepository.deleteUser.mockReset();
  });

  it("should be defined", () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });
});
