import { IItem } from "models/interfaces/item.interface";
import { Order } from "../order.model";

export class OrderBuilder {
    private item!: IItem;
    private price!: number;
    private quantity!: number;
    private id!: string;

    setItem(item: IItem): OrderBuilder {
        this.item = item;
        return this;
    }

    setPrice(price: number): OrderBuilder {
        this.price = price;
        return this;
    }

    setQuantity(quantity: number): OrderBuilder {
        this.quantity = quantity;
        return this;
    }

    setId(id: string): OrderBuilder {
        this.id = id;
        return this;
    }

    build(): Order {
        if (!this.item || this.price === undefined || this.quantity === undefined || !this.id) {
            throw new Error("Missing required fields to build Order");
        }
        return new Order(
            this.id,
            this.item,
            this.price,
            this.quantity
        );
    }

    static create(): OrderBuilder {
        return new OrderBuilder();
    }
}
