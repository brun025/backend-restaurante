import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductDto } from './dto/product.dto';
import { Products } from './entities/products.entity';
import { ProductService } from './product.service';

// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  public async getAll(@Res() res, @Req() request): Promise<Products[]> {
    // console.log(request.query)
    const products = await this.productService.findAll(request.query);

    return res.status(HttpStatus.OK).json(products);
  }

  @Get('/paged')
  public async getPaged(@Res() res: Response, @Req() request: Request) {
    let { limit, page }: any = request.query;
    const { type }: any = request.query;
    limit = parseInt(limit || 0);
    page = parseInt(page || 0);
    const productPaged = await this.productService.findPaged(limit, page, type); 
    
    return res.status(HttpStatus.OK).json({
      total: productPaged.total,
      page: productPaged.page,
      totalPages: productPaged.totalPages,
      limit: productPaged.limit,
      offset: productPaged.offset,
      instances: productPaged.instaces
    });
  }

  @Get('/:productId')
  public async getById(@Res() res, @Param('productId') productId: string): Promise<Products> {
    // console.log(request.query)
    const product = await this.productService.findById(productId);

    if(product){
      return res.status(HttpStatus.OK).json(product);
    }
    else{
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Produto não encontrado.',
        status: HttpStatus.NOT_FOUND,
      });
    }
  }

  @Post()
  public async create(
    @Res() res,
    @Body() productDto: ProductDto
  ): Promise<any> {
    try {
      // console.log(productDto)
      if(productDto.image){
        const nameImage = (new Date()).valueOf().toString() + '.png';
        // console.log(productDto)
        const base64Data = productDto.image.replace(/^data:image\/png;base64,/, "");
  
        require("fs").writeFile(`./src/product/images/${nameImage}`, base64Data, 'base64', function(err) {
          console.log(err);
          if(err != null){
            return res.status(HttpStatus.BAD_REQUEST).json({
              message: 'Erro ao salvar imagem!'+err,
              status: HttpStatus.BAD_REQUEST,
            });
          }
        });
        productDto.image = `product/images/${nameImage}`;
      }

      await this.productService.create(productDto);

      return res.status(HttpStatus.OK).json({
        message: 'Produto cadastrado com sucesso.',
        status: HttpStatus.OK,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao cadastrar produto!',
        status: HttpStatus.BAD_REQUEST,
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
          const nameImage = (new Date()).valueOf().toString() + '.png';
          // console.log(productDto)
          const base64Data = productDto.image.replace(/^data:image\/png;base64,/, "");
    
          require("fs").writeFile(`./src/product/images/${nameImage}`, base64Data, 'base64', function(err) {
            console.log(err);
            if(err != null){
              return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Erro ao salvar imagem!'+err,
                status: HttpStatus.BAD_REQUEST,
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
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Produto não encontrado.',
          status: HttpStatus.NOT_FOUND,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao atualizar produto!',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  @Put('/:productId/update-status')
  public async updateStatus(
    @Res() res,
    @Body() body: any,
    @Param('productId') productId: string
  ): Promise<any> {
    try {
      const product = await this.productService.findById(productId);
      if(product){
        product.status = body.status;
        await this.productService.updateStatus(body, productId);
  
        return res.status(HttpStatus.OK).json({
          message: 'Status atualizado com sucesso.',
          status: HttpStatus.OK,
        });
      }
      else{
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Produto não encontrado.',
          status: HttpStatus.NOT_FOUND,
        });
      }
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Erro ao atualizar status!',
        status: HttpStatus.BAD_REQUEST,
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
        status: HttpStatus.OK,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: "Erro ao deletar produto!",
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
