export const ProductService = {
    getProductsMini() {
        const sampleProducts = [
            {
                id: '1000',
                name: 'Bamboo Watch',
                image: 'bamboo-watch.jpg',
                price: 65,
                category: 'Accessories',
                rating: 5,
                inventoryStatus: 'INSTOCK',
            },
            {
                id: '1001',
                name: 'Black Watch',
                image: 'black-watch.jpg',
                price: 72,
                category: 'Accessories',
                rating: 4,
                inventoryStatus: 'LOWSTOCK',
            },
            {
                id: '1002',
                name: 'Blue Band',
                image: 'blue-band.jpg',
                price: 49,
                category: 'Fitness',
                rating: 3,
                inventoryStatus: 'OUTOFSTOCK',
            },
            {
                id: '1003',
                name: 'Game Controller',
                image: 'game-controller.jpg',
                price: 99,
                category: 'Gaming',
                rating: 4,
                inventoryStatus: 'INSTOCK',
            },
        ];

        // Generate more products dynamically by replicating the sample data
        const products = Array.from({ length: 50 }, (_, i) => {
            const baseProduct = sampleProducts[i % sampleProducts.length];
            return {
                ...baseProduct,
                id: `${1000 + i}`, // Unique ID
                name: `${baseProduct.name} ${i + 1}`, // Append index for uniqueness
                price: baseProduct.price + i, // Add variation in price
                rating: (baseProduct.rating + i) % 5 + 1, // Cycle ratings between 1-5
                inventoryStatus:
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
