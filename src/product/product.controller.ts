import { Controller, Get, Post, Body, Res, Req, HttpStatus, UseGuards, Delete, Param, UnsupportedMediaTypeException, Put } from '@nestjs/common';
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
  public async getAll(@Res() res, @Req() request): Promise<Products[]> {
    // console.log(request.query)
    const products = await this.productService.findAll(request.query);

    return res.status(HttpStatus.OK).json({
      products: products,
      status: 200,
    });
  }

  @Get('/:productId')
  public async getById(@Res() res, @Param('productId') productId: string): Promise<Products[]> {
    // console.log(request.query)
    const product = await this.productService.findById(productId);

    return res.status(HttpStatus.OK).json({
      product: product,
      status: 200,
    });
  }

  @Post()
  public async create(
    @Res() res,
    @Body() productDto: ProductDto
  ): Promise<any> {
    try {
      // console.log(productDto)
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

  @Put('/:productId')
  public async update(
    @Res() res,
    @Body() productDto: ProductDto,
    @Param('productId') productId: string
  ): Promise<any> {
    try {
      const product = await this.productService.findById(productId);
      if(product){
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
  
        await this.productService.update(productDto, productId);
  
        return res.status(HttpStatus.OK).json({
          message: 'Produto atualizado com sucesso.',
          status: 200,
        });
      }
      else{
        return res.status(HttpStatus.OK).json({
          message: 'Produto não encontrado.',
          status: 200,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao atualizar produto!',
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
