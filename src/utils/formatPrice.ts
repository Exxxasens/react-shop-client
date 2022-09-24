function formatPrice(price: number) {
    return price.toLocaleString('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0
    });
}

export default formatPrice;
