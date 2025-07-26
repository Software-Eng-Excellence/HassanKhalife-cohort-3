import { IItem } from './item.interface';

export interface IOrder {
    getItem(): IItem;
    getPrice(): number;
    getQuantity(): number;
    getId(): string;
}