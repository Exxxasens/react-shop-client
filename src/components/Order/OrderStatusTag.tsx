import Tag from "../ui/Tag";
import { OrderStatus } from "./OrderStatus"

interface OrderTagProps {
    value: string;
}

const OrderStatusTag = ({ value }: OrderTagProps) => {

    if (value === OrderStatus.Created) {
        return <Tag>
            Создан
        </Tag>
    }

    if (value === OrderStatus.Shipped) {
        return <Tag color="#10644e" background="#D1FAE5">
            Отправлен
        </Tag>
    }

    if (value === OrderStatus.Delivered) {
        return <Tag color="#446ffd" background="#ebf0fe">
            Доставлен
        </Tag>
    }

    if (value === OrderStatus.Canceled) {
        return <Tag color="#9c2525" background="rgb(255, 232, 232)">
            Отменен
        </Tag>
    }

    return null;

}


export default OrderStatusTag;