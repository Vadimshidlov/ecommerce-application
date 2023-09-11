import React, { useEffect, useRef, useState } from "react";
import { Button } from "shared/components/button/Button";
import plusButton from "assets/svg/Plus.svg";
import minusButton from "assets/svg/Minus.svg";
import { ButtonIcon } from "shared/components/ButtonIcon/ButtonIcon";
import { ProductResponseType } from "view/app-components/ProductPage/types";
import { CategoryNameType } from "view/app-components/ProductPage/useGetProductDate";
import AxiosSignUpService from "service/AxiosApiService/AxiosApiService";
import { Link } from "react-router-dom";
import BasketService from "service/BasketService/BasketService";
import {
    addProductMessage,
    removeProductMessage,
    somethingWrongMessage,
} from "shared/utils/notifyMessages";
import BasketStore from "store/basket-store";

export type ProductBodyType = {
    productResponse: ProductResponseType;
    checkedSize: number;
    basketQuantity: number;
    isInBasket: boolean;
    lineItemId: string;
    setIsInBasketHandler: (value: boolean) => Promise<void>;
    setCheckedSize: (value: number) => void;
};

function ProductBody({
    productResponse,
    checkedSize,
    basketQuantity,
    isInBasket,
    setIsInBasketHandler,
    lineItemId,
    setCheckedSize,
}: ProductBodyType) {
    const axiosApi = useRef(AxiosSignUpService);
    const [categoriesName, setCategoriesName] = useState<string[]>();
    const BASKET_SERVICE_API = useRef(new BasketService());
    const [productCount, setProductCount] = useState<number>(basketQuantity);
    const { getBasketVersion, setBasketVersion } = BasketStore;

    useEffect(() => {
        const getProductCategories = async () => {
            const categoriesIdList = productResponse.categories.map((el) => el.id);
            const categoryNamesResponse = await Promise.all(
                categoriesIdList?.map((categoryId) => {
                    const categoryIdResponse = axiosApi.current.get<CategoryNameType>(
                        {},
                        `/categories/${categoryId}`,
                    );

                    return categoryIdResponse;
                }),
            );

            const categoriesNamesList: string[] = [];
            categoryNamesResponse.forEach((categoryIdResponse) =>
                categoriesNamesList.push(categoryIdResponse.data.name["en-US"]),
            );

            setCategoriesName(categoriesNamesList);
        };

        getProductCategories();
    }, [productResponse]);

    let productColor: string = "";
    productResponse.masterVariant.attributes.forEach((variant) => {
        if (variant.name === "color") {
            productColor = variant.value.key;
        }
    });

    const productColorClass = `product__color product__color__${productColor}`;
    const masterSize: string[] = [];
    productResponse.masterVariant.attributes.forEach((attribute) => {
        if (attribute.name === "size") {
            masterSize.push(attribute.value.key);
        }
    });

    const productSizesVariants = productResponse.variants.map((productVariant) => {
        let size = "";
        productVariant.attributes.forEach((attribute) => {
            if (attribute.name === "size") {
                size = attribute.value.key;
            }
        });

        return size;
    });

    const productSizes: string[] = [...masterSize, ...productSizesVariants];
    const productDiscountPriceCent =
        productResponse.masterVariant.prices[0].discounted?.value?.centAmount;
    const productDiscountPrice = productDiscountPriceCent / 100;
    const productPrice = productResponse.masterVariant.prices[0].value.centAmount / 100;

    const productButtonHandler = async () => {
        try {
            if (isInBasket) {
                console.log(lineItemId, `lineItemId`);

                try {
                    const removeProductResponse =
                        await BASKET_SERVICE_API.current.removeProductFromBasket(
                            lineItemId,
                            productCount,
                            getBasketVersion(),
                        );
                    console.log(removeProductResponse, `removeProductResponse`);
                    setIsInBasketHandler(false);
                    setProductCount(1);
                    removeProductMessage("Product is");
                } catch (e) {
                    console.log(e);
                    somethingWrongMessage();
                }
            }

            if (!isInBasket) {
                try {
                    const addProductToCartResponse =
                        await BASKET_SERVICE_API.current.addProductToBasket(
                            productResponse.id,
                            productCount,
                        );

                    console.log(addProductToCartResponse, `addProductToCartResponse`);
                    setBasketVersion(addProductToCartResponse.version);
                    setIsInBasketHandler(true);
                    addProductMessage();
                } catch (e) {
                    somethingWrongMessage();
                    console.log(e);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="product__body">
            <ul className="product__category-list">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className="product__category-list__separator" />
                {categoriesName?.map((categoryName, index, array) => {
                    if (index !== array.length - 1) {
                        return (
                            <React.Fragment key={categoryName}>
                                <li>
                                    <Link to={`/shop/${categoryName.toLowerCase()}`}>
                                        {categoryName}
                                    </Link>
                                </li>
                                <li className="product__category-list__separator" />
                            </React.Fragment>
                        );
                    }

                    return (
                        <li key={categoryName}>
                            <Link to={`/shop/${categoryName.toLowerCase()}`}>{categoryName}</Link>
                        </li>
                    );
                })}
            </ul>
            <div className="product__card-info">
                <h2 className="space-grotesk-500-font font-size_heading-5 color_black">
                    {productResponse.name["en-US"]}
                </h2>
                <div className="inter-400-font font-size_s color_grey-dark">
                    {productResponse.description["en-US"]}
                </div>
                <div className="product__price">
                    {productDiscountPrice ? (
                        <div className="product__price-container">
                            <span className="product__price">${productDiscountPrice}</span>
                            <span className="product__price-old">{productPrice}</span>
                        </div>
                    ) : (
                        <div className="product__price">${productPrice}</div>
                    )}
                </div>
            </div>
            <span className="product__color__title">Color:</span>
            <div className="product__colors">
                <div className={productColorClass} />
            </div>
            <span className="product__color__title">Size:</span>
            <ul className="product_sizes">
                {productSizes.map((productSize, index) => (
                    <button
                        onClick={() => {
                            setCheckedSize(index);
                        }}
                        onKeyDown={() => {
                            setCheckedSize(index);
                        }}
                        className={
                            index === checkedSize
                                ? "product__size product__size__active"
                                : "product__size"
                        }
                        key={productSize}
                    >
                        {productSize}
                    </button>
                ))}
            </ul>
            <div hidden={isInBasket}>
                <div className="product__cart-count">
                    <ButtonIcon
                        url={minusButton}
                        altText="icon-eye"
                        classes="product__cart-count__button-minus"
                        onClick={() => {
                            if (productCount > 1) {
                                setProductCount((prevState) => prevState - 1);
                            }
                        }}
                    />
                    <span>{productCount}</span>
                    <ButtonIcon
                        url={plusButton}
                        altText="icon-eye"
                        classes="product__cart-count__button-plus"
                        onClick={() => setProductCount((prevState) => prevState + 1)}
                    />
                </div>
            </div>
            <Button
                type="button"
                text={isInBasket ? "Remove from bakset" : "Add to Bakset"}
                textClasses={["space-grotesk-500-font", "font-size_2xl", "color_white"]}
                buttonClasses="button btn-full-width"
                onClick={productButtonHandler}
            />
        </div>
    );
}

export default ProductBody;
