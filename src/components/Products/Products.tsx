import { useDispatch, useSelector } from "react-redux";
import { addProducts, AppState } from "./ProductsSlice";
import { useGetProductsQuery } from "../CreateApi/productApi";
import { useEffect } from "react";

const Products = () => {
    const products = useSelector((state: AppState) => state.products.products);
    const dispatch = useDispatch()
    const { data, isLoading } = useGetProductsQuery();
    useEffect(() => {
        if (data) {
            dispatch(addProducts(data));
        }
    }, [data]);
    return (
        <div className="products">
            <h1>Products</h1>
            <p>This is the Products page.</p>
            {isLoading ? <p>Loading products...</p> :
                products.map(product => (
                    <div key={product.id} className="product">
                        <h2>{product.name}</h2>
                        <p>Price: ${product.price}</p>
                    </div>
                ))}
        </div>
    );
}

export default Products;