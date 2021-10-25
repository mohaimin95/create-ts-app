/* eslint-disable no-empty-function */
import { ICategory } from '@interfaces';
import { CategoryService } from '@services';
import { Request, Response } from 'express';

export class CategoryController {
  static async create(req: Request | any, res: Response) {
    try {
      const data: ICategory = {
        ...req.body,
        createdBy: req.user._id,
      };

      await CategoryService.create(data);
      res.status(201).send({ message: 'Success' });
    } catch (ex) {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  static async getAll(req: Request, res: Response) {
    try {
      const categories: ICategory[] = await CategoryService.getAll();

      res.send({ categories });
    } catch (ex) {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  static async getOne(req: Request, res: Response) {
    try {
      const category: any = await CategoryService.getOne(req.params.id);

      res.send(category);
    } catch (ex) {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      await CategoryService.update(req.params.id, req.body);
      res.send({ message: 'Success!' });
    } catch (ex) {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      await CategoryService.delete(req.params.id);
      res.send({ message: 'Success!' });
    } catch (ex) {
      res.status(500).send({ message: 'Something went wrong!' });
    }
  }
}
