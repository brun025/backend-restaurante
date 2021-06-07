import {
  Controller,
  Put,
  Get,
  Delete,
  Post,
  Body,
  Res,
  Req,
  Param,
  UseGuards,
  HttpStatus,
  NotFoundException,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "@nestjs/passport";
import { UserProfileDto } from "./dto/user-profile.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "./entities/users.entity";
import { RolesGuard } from "src/auth/roles.guard";
import { Role } from "src/auth/role.decorator";
import { UserRole } from "./user-roles.enum";

// @UseGuards(AuthGuard(), RolesGuard)
@Controller("/api/users")
export class UsersController{
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @Role(UserRole.USER)
  public async getAll(@Res() res, @Req() req: any, ): Promise<Users[]> {
    const users = await this.usersService.findAll();

    return res.status(HttpStatus.OK).json({
      users: users,
      status: 200,
    });
  }

  @Get("/:userId")
    public async findById(
      @Res() res, 
      @Req() req: any,
      @Param('userId') userId: string,
    ): Promise<Users> {
      const user = await this.usersService.findById(userId);
      return res.status(HttpStatus.OK).json({
        user: user,
        status: 200,
      });
  }

  @Post('/signup')
  public async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ message: string }> {
    await this.usersService.create(createUserDto);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Put("/:userId")
  public async updateProfileUser(
    @Res() res,
    @Param('userId') userId: string, 
    @Body() userProfileDto: UserProfileDto
  ): Promise<any> {
    try {
      await this.usersService.updateProfileUser(userId, userProfileDto);

      return res.status(HttpStatus.OK).json({
        message: "User Updated successfully!",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: User not updated!",
        status: 400,
      });
    }
  }

  @Delete("/:userId/destroy")
  public async deleteUser(
    @Res() res,
    @Param('userId') userId: string
  ): Promise<any> {
    try {
      await this.usersService.deleteUser(userId);

      return res.status(HttpStatus.OK).json({
        message: "User Deleted successfully!",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Error: User not found!",
        status: 400,
      });
    }
  }
}
