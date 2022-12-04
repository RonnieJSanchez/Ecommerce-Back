import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import { 
    FaDollarSign, 
    FaProjectDiagram, 
    FaRegClock, 
    FaCheck, 
    FaTimes, 
    FaTruckMoving,
    FaWarehouse, 
    FaRocket, 
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

export default function ProductView() {
    // context
    const [cart, setCart] = useCart();
    //state
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    //hooks
    const params = useParams();

    useEffect(() => {
        if(params?.slug) loadProduct();
    }, [params?.slug]);

    const loadProduct = async (req, res) => {
        try {
            const {data} = await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id, data.category._id);
        } catch (err) {
            console.log(err);
        }
    };

    const loadRelated = async(productId, categoryId) => {
        try{
            const { data } = await axios.get(
                `/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9">
                        <div className="card mb-3 mt-3">
                            <img 
                                className="card-img-top mt-3"
                                src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} 
                                alt={product.name} 
                                style={{height: "500px", width: "100%", objectFit: "contain"}}
                            />

                        <div className="card-body">
                            <h1 className="fw-bold">{product?.name}</h1>
                            <p className="card-text lead">{product?.description}</p>
                        </div>

                        <div className="d-flex justify-content-between lead p-5 bg-light">
                            <div>
                                <p>
                                <FaDollarSign /> Price:{" "}
                                {product?.price?.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                    })}
                                </p>

                                <p>
                                    <FaProjectDiagram /> Category:  {product?.category?.name}
                                </p>

                                <p>
                                    <FaRegClock /> Added:  {moment(product.createdAt).fromNow()}
                                </p>
                                
                                <p>
                                    {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                                    {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                                </p>

                            </div>
                        </div>

                        <button 
                            className="btn btn-outline-primary col card-button"
                            style={{
                                borderBottomRightRadius: "5px",
                                borderBottomLeftRadius: "5px"
                        }}
                        onClick={() => {
                            setCart([...cart, product]);
                            toast.success("Added to cart");
                        }}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="col-md-3">
                    <h2>Related Products</h2>
                    <hr />
                    {related?.length < 1 && <p>No related products</p>}
                    {related?.map((p) => (
                        <ProductCard p={p} key={p._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}