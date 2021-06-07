import { Controller, Get, Post, Body, Res, HttpStatus, UseGuards, Delete, Param, UnsupportedMediaTypeException } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { Products } from './entities/products.entity';
import { ProductService } from './product.service';
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from 'src/auth/get-user.decorator';
import { Users } from 'src/users/entities/users.entity';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAll(@Res() res): Promise<Products[]> {
    const products = await this.productService.findAll();

    return res.status(HttpStatus.OK).json({
      products: products,
      status: 200,
    });
  }

  @Post()
  public async create(
    @Res() res,
    @Body() productDto: ProductDto
    // @GetUser() user: Users
  ): Promise<any> {
    try {
      // productDto.user = user;
      console.log(productDto)

      if(productDto.image){
        var nameImage = (new Date()).valueOf().toString() + '.png';
        // console.log(productDto)
        var base64Data = productDto.image.replace(/^data:image\/png;base64,/, "");
  
        require("fs").writeFile(`./src/product/images/${nameImage}`, base64Data, 'base64', function(err) {
          console.log(err);
          if(err != null){
            return res.status(HttpStatus.BAD_REQUEST).json({
              message: 'Erro ao salvar imagem!'+err,
              status: 400,
            });
          }
        });
        productDto.image = `product/images/${nameImage}`;
      }

      await this.productService.create(productDto);

      return res.status(HttpStatus.OK).json({
        message: 'Produto cadastrado com sucesso.',
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao cadastrar produto!',
        status: 400,
      });
    }
  }

  @Delete("/:productId")
  public async delete(
    @Res() res,
    @Param('productId') productId: string
  ): Promise<any> {
    try {
      await this.productService.delete(productId);

      return res.status(HttpStatus.OK).json({
        message: "Produto deletado com sucesso.",
        status: 200,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao deletar produto!",
        status: 400,
      });
    }
  }
}
