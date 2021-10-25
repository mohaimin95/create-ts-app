import { ICategory } from '@interfaces';
import { Category } from '@models';

/* eslint-disable no-empty-function */
export class CategoryService {
  static create(data: ICategory) {
    const newCategory = new Category(data);

    return newCategory.save();
  }
  static getAll() {
    return Category.find().lean();
  }
  static getOne(_id: string) {
    return Category.findById(_id);
  }
  static update(_id: string, data: ICategory) {
    return Category.updateOne({ _id }, { $set: data });
  }
  static delete(_id: string) {
    return Category.deleteOne({ _id });
  }
}
