import { IItem } from "./interfaces/item.interface";

export class Order {
    private readonly id: string;
    private readonly item: IItem;
    private readonly price: number;
    private readonly quantity: number;

    constructor(id: string, items: IItem, price: number, quantity: number) {
        this.id = id;
        this.item = items;
        this.price = price;
        this.quantity = quantity;
    }

    getId(): string {
        return this.id;
    }

    getItem(): IItem {
        return this.item;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTotalPrice(): number {
        return this.price * this.quantity;
    }
}
