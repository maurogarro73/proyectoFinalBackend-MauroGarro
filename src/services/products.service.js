import { ProductModel } from '../DAO/models/products.model.js';
import { ProductClass } from '../DAO/classes/products.class.js';
import CustomError from './errors/CustomError.js';
import { generateUserErrorInfo } from './errors/info.js';
import { EError } from './errors/enums.js';
import { transport } from '../utils.js';
import { logger } from '../utils/logger.utils.js';

const productClass = new ProductClass();

export class ProductService {
  validateProduct(title, description, price, thumbnail, code, stock, category, status = true, owner) {
    if ((!title || !description || !price || !thumbnail || !code || !stock || !category || !status, !owner)) {
      CustomError.createError({
        name: 'User creation error',
        cause: generateUserErrorInfo(title, description, price, thumbnail, code, stock, category, (status = true), owner),
        message: 'Error trying to create user',
        code: EError.INCOMPLETE_FIELD_ERROR,
      });
    }
  }

  async getProducts(limit, page, category, sort) {
    const queryCategory = category ? { category: category } : {};

    let querySort = {};
    if (sort == 'asc') {
      querySort = { price: 1 };
    } else if (sort == 'desc') {
      querySort = { price: -1 };
    } else {
      querySort = {};
    }

    const productsPaginate = await ProductModel.paginate(queryCategory, { limit: limit || 5, page: page || 1, sort: querySort });

    //Creo e Incorporo los link prev y next antes de devolver todo
    productsPaginate.prevLink = productsPaginate.prevPage ? `/api/products?page=${productsPaginate.prevPage}` : null;
    productsPaginate.nextLink = productsPaginate.nextPage ? `/api/products?page=${productsPaginate.nextPage}` : null;

    return productsPaginate;
  }

  async getOneById(id) {
    const product = await productClass.getOneById(id);
    return product;
  }

  async createOne(title, description, price, thumbnail, code, stock, category, status, owner) {
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status, owner);
    const productCreated = await productClass.createOne(title, description, price, thumbnail, code, stock, category, status, owner);
    return productCreated;
  }

  async deleteOne(id) {
    try {
      const productFound = await productClass.getOneById(id);
      const userEmail = productFound.owner;
      if (productFound.owner == 'admin') {
        const deleted = await productClass.deleteOne(id);
        return deleted;
      } else {
        const result = transport.sendMail({
          from: process.env.GOOGLE_EMAIL,
          to: userEmail,
          subject: 'Su producto fue eliminado por el Administrador',
          html: `
            <div>
              <h3>Detalles del producto: </h3>
              <p>Titulo: ${productFound.title}</p>
              <p>Descripcion: ${productFound.description}</p>
              <p>Precio: ${productFound.price}</p>
              <p>Codigo: ${productFound.code}</p>
              <p>Stock: ${productFound.stock}</p>
              <p>Categoria: ${productFound.category}</p>
              <p>Thumbnail: ${productFound.thumbnail}</p>
            </div>
          `,
        });

        if (result.status === 'rejected') {
          logger.error(`El correo electrónico a ${userEmail} fue rechazado`);
        }

        const deleted = await productClass.deleteOne(id);
        return deleted;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category, status, owner) {
    if (!id) throw new Error('Invalid _id');
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status, owner);
    const productUptaded = await productClass.updateOne(id, title, description, price, thumbnail, code, stock, category, status, owner);
    return productUptaded;
  }
}
