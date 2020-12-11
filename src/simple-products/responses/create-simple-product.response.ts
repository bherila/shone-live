import { CreateFileResponse } from 'src/files/responses/create-file.response';

import { SimpleProduct } from '../entities/simple-product.entity';

export class CreateSimpleProductResponse {
  private id: string;
  private user_id: string;
  private show_id: number;
  private description: string;
  private name: string;
  private price: number;
  private quantity: number;
  private files: CreateFileResponse[];

  constructor(simpleProduct: SimpleProduct) {
    this.id = simpleProduct.id;
    this.user_id = simpleProduct.user.id;
    this.show_id = simpleProduct.show.id;
    this.description = simpleProduct.description;
    this.name = simpleProduct.name;
    this.price = simpleProduct.price;
    this.quantity = simpleProduct.quantity;
    this.files = simpleProduct.files.map(file => new CreateFileResponse(file));
  }
}
