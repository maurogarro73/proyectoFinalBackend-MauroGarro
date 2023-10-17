import express from 'express';
import { ProductModel } from '../DAO/models/products.model.js';
import { isAdminOrPremium } from '../middleware/auth.js';
import { logger } from '../utils/logger.utils.js';

export const productsRealTime = express.Router();

productsRealTime.get('/', isAdminOrPremium, async (req, res) => {
  try {
    const userEmail = req.session?.email;
    const userRole = req.session?.premium;
    if (userRole) {
      const productsAll = await ProductModel.find({ owner: userEmail });
      const products = productsAll.map((product) => {
        return {
          title: product.title,
          id: product._id,
          description: product.description,
          price: product.price,
          code: product.code,
          stock: product.stock,
          category: product.category,
          thumbnail: product.thumbnail,
          owner: product.owner,
        };
      });
      return res.status(200).render('realTimeProducts', { products, userEmail, userRole });
    } else {
      const productsAll = await ProductModel.find({});
      const products = productsAll.map((product) => {
        return {
          title: product.title,
          id: product._id,
          description: product.description,
          price: product.price,
          code: product.code,
          stock: product.stock,
          category: product.category,
          thumbnail: product.thumbnail,
          owner: product.owner,
        };
      });
      return res.status(200).render('realTimeProducts', { products, userEmail, userRole });
    }
  } catch (error) {
    logger.error(error);
  }
});
