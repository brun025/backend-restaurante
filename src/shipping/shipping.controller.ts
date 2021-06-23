import {
  Controller,
  Put,
  Get,
  Delete,
  Post,
  Body,
  Res,
  Param,
  HttpStatus,
} from "@nestjs/common";
import { ShippingDto } from "./dto/shipping.dto";
import { Shipping } from "./entities/shipping.entity";
import { ShippingService } from "./shipping.service";

@Controller("/api/shippings")
export class ShippingController{
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  public async getAll(@Res() res ): Promise<Shipping[]> {
    const shippings = await this.shippingService.findAll();

    return res.status(HttpStatus.OK).json({
      shippings: shippings,
      status: 200,
    });
  }

  @Get("/:shippingId")
    public async findById(
      @Res() res, 
      @Param('shippingId') shippingId: string,
    ): Promise<Shipping> {
      const shipping = await this.shippingService.findById(shippingId);
      return res.status(HttpStatus.OK).json({
        shipping: shipping,
        status: 200,
      });
  }

  @Post()
  public async create(
    @Res() res,
    @Body() shippingDto: ShippingDto
  ): Promise<any> {
    try {
      await this.shippingService.create(shippingDto);

      return res.status(HttpStatus.OK).json({
        message: "Frete cadastrado com sucesso.",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao cadastrar frete!",
        status: 400,
      });
    }
  }

  @Put("/:shippingId")
  public async update(
    @Res() res,
    @Param('shippingId') shippingId: string, 
    @Body() shippingDto: ShippingDto
  ): Promise<any> {
    try {
      await this.shippingService.update(shippingId, shippingDto);

      return res.status(HttpStatus.OK).json({
        message: "Frete atualizado com sucesso.",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao atualizar frete!",
        status: 400,
      });
    }
  }

  @Delete("/:shippingId/destroy")
  public async delete(
    @Res() res,
    @Param('shippingId') shippingId: string
  ): Promise<any> {
    try {
      await this.shippingService.delete(shippingId);

      return res.status(HttpStatus.OK).json({
        message: "Frete deletado com sucesso",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao deletar frete",
        status: 400,
      });
    }
  }
}
