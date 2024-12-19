export const ProductService = {
    getProductsMini() {
        const sampleProducts = [
            {
                id: '1000',
                title: 'Bamboo Watch',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                rating: 5,
                status: 'INSTOCK',
            },
           
        ];
        const products = Array.from({ length: 50 }, (_, i) => {
            const baseProduct = sampleProducts[i % sampleProducts.length];
            return {
                ...baseProduct,
                id: `${1000 + i}`, 
                price: baseProduct.price + i, 
                rating: (baseProduct.rating + i) % 5 + 1, 
                status:
                    i % 3 === 0
                        ? 'INSTOCK'
                        : i % 3 === 1
                        ? 'LOWSTOCK'
                        : 'OUTOFSTOCK',
            };
        });

        return Promise.resolve(products);
    },
};
