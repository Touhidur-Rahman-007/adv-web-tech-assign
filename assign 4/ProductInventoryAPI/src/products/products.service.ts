import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Products } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepo: Repository<Products>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = this.productsRepo.create(dto);
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  async findAll() {
    const products = await this.productsRepo.find({
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.getProductOrFail(id);

    return {
      message: 'Product retrieved successfully',
      data: product,
    };
  }

  async update(id: number, dto: PartialUpdateProductDto) {
    await this.getProductOrFail(id);
    await this.productsRepo.update(id, dto);
    const updatedProduct = await this.getProductOrFail(id);

    return {
      message: 'Product updated successfully',
      data: updatedProduct,
    };
  }

  async replace(id: number, dto: UpdateProductDto) {
    await this.getProductOrFail(id);
    await this.productsRepo.update(id, dto);
    const replacedProduct = await this.getProductOrFail(id);

    return {
      message: 'Product replaced successfully',
      data: replacedProduct,
    };
  }

  async remove(id: number) {
    await this.getProductOrFail(id);
    await this.productsRepo.delete(id);

    return {
      message: 'Product deleted successfully',
      id,
    };
  }

  async findByCategory(category: string) {
    const products = await this.productsRepo.find({
      where: { category },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products by category retrieved successfully',
      count: products.length,
      data: products,
    };
  }

  async search(keyword: string) {
    const normalizedKeyword = keyword?.trim() ?? '';

    const products = await this.productsRepo.find({
      where: { name: ILike(`%${normalizedKeyword}%`) },
      order: { createdAt: 'DESC' },
    });

    return {
      message: 'Products search completed successfully',
      count: products.length,
      data: products,
    };
  }

  async toggleActive(id: number) {
    const product = await this.getProductOrFail(id);
    product.isActive = !product.isActive;
    const savedProduct = await this.productsRepo.save(product);

    return {
      message: 'Product active status toggled successfully',
      data: savedProduct,
    };
  }

  private async getProductOrFail(id: number) {
    const product = await this.productsRepo.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }
}
