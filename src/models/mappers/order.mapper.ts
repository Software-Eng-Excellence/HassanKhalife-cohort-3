import { OrderBuilder } from "../builders/order.builder";
import { IItem } from "../interfaces/item.interface";
import { IOrder } from "../interfaces/order.interface";
import { IMapper } from "../interfaces/mapper.interface";

export class OrderMapper implements IMapper<string[], IOrder> {

    constructor(private itemMapper: IMapper<string[], IItem>) { }

    map(data: string[]): IOrder {
        return OrderBuilder.create()
            .setId(data[0])
            .setItem(this.itemMapper.map(data))
            .setPrice(parseFloat(data[data.length - 2]))
            .setQuantity(parseInt(data[data.length - 1]))
            .build();
    }

    reverseMap(order: IOrder): string[] {
        return [
            order.getId(),
            ...this.itemMapper.reverseMap(order.getItem()),
            order.getPrice().toString(),
            order.getQuantity().toString()
        ];
    }
}
