'use client';

import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { NoSymbolIcon, ClockIcon, SparklesIcon } from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Product, ISizeInventory, ProductStatus } from "@/data/data";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import { useCartStore } from "@/app/stores/cartStore";
import { cloudinaryLoader } from "@/utils/cloudinaryLoader";

import { siteName, siteDescription, siteUrl } from "@/lib/config";
const ProductDetailComponent = ({ initialProduct }: { initialProduct: Product }) => {
    const { id } = useParams();
    const [sizeSelected, setSizeSelected] = useState("");
    const [quantitySelected, setQuantitySelected] = useState(1);
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);
    const { addItem } = useCartStore();

    // Fetch product data
    const { data: product, isLoading, isError } = useQuery<Product>({
        queryKey: ['product', initialProduct._id],
        queryFn: async () => {
            const res = await fetch(`/api/products?ids=${initialProduct._id}`);
            if (!res.ok) throw new Error('Product not found');
            const data = await res.json();
            return data[0] as Product;
        },

        initialData: initialProduct,
        staleTime: 1000 * 60 * 5,
        enabled: !!id,

    });

    const notifyAddTocart = () => {

        if (!product || !sizeSelected) return;

        const selectedSize = product.sizeInventory.find(si => si.size === sizeSelected);
        if (!selectedSize || selectedSize.stock < quantitySelected) {
            toast.error("Selected quantity exceeds available stock");
            return;
        }

        addItem({
            productId: product._id,
            name: product.name,
            price: product.price,
            discountedPrice: product.discountedPrice,
            sizeInventory: product.sizeInventory,
            size: sizeSelected,
            quantity: quantitySelected,
            image: product.images[0],
            // sizeInventory: product.sizeInventory, // Removed as it is not a valid property
            // Removed 'isValid' as it is not a valid property
        });

        toast.success(`${product.name} added to cart`);
    };

    const renderSizeList = () => {
        if (!product?.sizeInventory?.length) return null;

        return (
            <div>
                <div className="flex justify-between font-medium text-sm">
                    <label>
                        <span>Size: <span className="font-semibold ml-1">{sizeSelected}</span></span>{sizeSelected ? "" : <span className="text-red-500"> (Please select a size)</span>}
                    </label>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2 mt-3">
                    {product.sizeInventory.map((sizeInv) => {
                        const isActive = sizeInv.size === sizeSelected;
                        const isOutOfStock = sizeInv.stock === 0;

                        return (
                            <div
                                key={sizeInv.size}
                                className={`relative h-10 sm:h-11 hover:bg-primary-100 rounded-2xl border flex items-center justify-center 
                  text-sm sm:text-base uppercase font-semibold select-none overflow-hidden z-0 ${isOutOfStock
                                        ? "text-opacity-20 cursor-not-allowed"
                                        : "cursor-pointer"
                                    } ${isActive
                                        ? "bg-primary-100 border-primary-600 text-primary-500 hover:bg-primary-200"
                                        : "border-slate-300 text-slate-900 hover:bg-neutral-50"
                                    }`}
                                onClick={() => !isOutOfStock && setSizeSelected(sizeInv.size)}
                            >
                                {sizeInv.size}
                                {isOutOfStock && <div className="absolute w-full h-full bg-white/50" />}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    const renderStatus = () => {
        if (!product?.status) return null;

        const statusComponents: Record<ProductStatus, JSX.Element | undefined> = {
            "New in": <SparklesIcon className="w-3.5 h-3.5" />,
            "Offer": <IconDiscount className="w-3.5 h-3.5" />,
            "Sold Out": <NoSymbolIcon className="w-3.5 h-3.5" />,
            "Limited Edition": <ClockIcon className="w-3.5 h-3.5" />,
            "Pre-Order": undefined // Add this or handle it as needed
        };

        return (
            <div className="absolute top-3 left-3 px-2.5 py-1.5 text-xs bg-white nc-shadow-lg rounded-full flex items-center justify-center">
                {statusComponents[product.status] || <NoSymbolIcon className="w-3.5 h-3.5" />}
                <span className="ml-1 leading-none">{product.status}</span>
            </div>
        );
    };
    if (isLoading) {
        return (
            <div className="container py-20 flex justify-center h-96 w-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-6000" />
            </div>
        );
    }
    if (!product) {
        return (
            <div className="container py-20 text-center text-red-500">
                Product not found
            </div>
        );
    }
    if (isError) {
        return (
            <div className="container py-20 text-center text-red-500">
                Product not found
            </div>
        );
    }
    // const ogImage = product.images[0] || "/default-product.jpg";
    // const ogTitle = `${product.name} | artexobd.com`;
    // const ogDesc = product.description;
    // const ogUrl = `https://artexobd.com/product/${product._id}`;
    // const ogType = "product";
    // const ogSiteName = "artexobd.com";
    const ogImage = product.images[0] || "/og.png";
    const ogTitle = `${product.name} | ${siteName}`;
    const ogDesc = product.description || siteDescription;
    const ogUrl = `${siteUrl}/product/${product._id}`;
    const ogType = "product";
    const ogSiteName = siteName;


    const renderSectionContent = () => {
        if (!product) return null;
        const maxQuantity = product.sizeInventory.find(si => si.size === sizeSelected)?.stock || 0;

        return (

            <div className="space-y-7 2xl:space-y-8">

                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">{product.name}</h2>
                    <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
                        <Prices
                            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
                            price={product.price}
                            discountedPrice={product.discountedPrice}
                        />
                        <div className="h-7 border-l border-slate-300" />
                        <div className="flex items-center">
                            <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                            <div className="ml-1.5 flex">
                                <span>{product.rating?.average?.toFixed(1) || 0}</span>
                                <span className="block mx-2">·</span>
                                <span className="text-slate-600 underline">
                                    {product.rating?.count || 0} reviews
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {renderSizeList()}

                <div className="flex space-x-3.5">
                    <div className="flex items-center justify-center bg-slate-100/70 px-2 py-3 sm:p-3.5 rounded-full">
                        <div className={!sizeSelected ? "pointer-events-none opacity-50" : ""}>
                            <NcInputNumber
                                defaultValue={quantitySelected}
                                onChange={(value) => setQuantitySelected(Math.min(value, maxQuantity))}
                                min={1}
                                max={maxQuantity}
                            />
                        </div>
                    </div>
                    <ButtonPrimary
                        className={`flex-1 flex-shrink-0 ${!maxQuantity || !sizeSelected ? "line-through" : ""}`}
                        onClick={notifyAddTocart}
                        disabled={!maxQuantity || !sizeSelected}
                    >
                        <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                        <span className="ml-3">Add to cart</span>
                    </ButtonPrimary>
                    {/* error message if size is not selected */}

                </div>
                
                <hr className="border-slate-200" />
                {/* product.color:string */}
                <div className="flex items-center text-sm font-medium">
                    <span>Color:</span>
                    <span className="text-slate-600 ml-2">{product.color ?? "As the image"}</span>
                </div>

                <AccordionInfo data={[
                    { name: "Size chart", content: product.sizeChart ?? "Our default size chart" },
                    { name: "Description", content: product.description },

                ]} />
                <div className="hidden xl:block">
                    <Policy />
                </div>
            </div>
        );
    };


    return (
        <>
            <div className="nc-ProductDetailPage">
                <main className="container mt-5 lg:mt-11">
                    <div className="lg:flex">
                        <div className="w-full lg:w-[55%]">
                            <div className="relative">
                                <div className="aspect-w-16 aspect-h-16 relative">
                                    <Image
                                        fill
                                        sizes="(min-width: 1024px) 32rem, (min-width: 640px) 20rem, 100vw"
                                        src={product.images[0] || '/default-product.jpg'}
                                        className="w-full rounded-2xl object-cover"
                                        alt={product.name}
                                        priority
                                        loader={cloudinaryLoader}
                                    />
                                </div>
                                {renderStatus()}
                                <LikeButton className="absolute right-3 top-3" />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-3 sm:gap-6 sm:mt-6">
                                {product.images.slice(1).map((image, index) => (
                                    <div key={index} className="aspect-w-11 aspect-h-16 relative">
                                        <Image
                                            fill
                                            sizes="(min-width: 1024px) 32rem, (min-width: 640px) 20rem, 100vw"
                                            src={image}
                                            className="w-full rounded-2xl object-cover"
                                            alt={`${product.name} - ${index + 1}`}
                                            loader={cloudinaryLoader}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7">
                            {renderSectionContent()}
                        </div>
                    </div>

                    <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
                        <div className="block xl:hidden">
                            <Policy />
                        </div>

                        <hr className="border-slate-200" />

                        <div className="">
                            <h2 className="text-2xl font-semibold flex items-center">
                                <StarIcon className="w-7 h-7 mb-0.5" />
                                <span className="ml-1.5"> Reviews</span>
                            </h2>
                            {product.rating ? (
                                <div className="mt-10">
                                    {/* <ReviewItem /> */}
                                    <ButtonSecondary
                                        onClick={() => setIsOpenModalViewAllReviews(true)}
                                        className="mt-10 border border-slate-300"
                                    >
                                        Show all reviews
                                    </ButtonSecondary>
                                </div>
                            ) : (
                                <div className="mt-5 text-slate-500">No reviews yet</div>
                            )}
                        </div>

                        <SectionPromo2 />
                    </div>
                </main>

                {/* <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      /> */}
            </div>
        </>
    );
};

export default ProductDetailComponent;