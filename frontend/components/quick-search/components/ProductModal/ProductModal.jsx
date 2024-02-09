import React from "react";
import "./ProductModal.less";

const ProductModal = ({ fetchedData }) => {
  const fetcedDataElements = fetchedData?.data?.products?.map((product) => {
    const productName =
      product.name.length > 16
        ? product.name.substr(0, 16) + "..."
        : product.name;
    return (
      <div key={product.name} className="Container">
        <img src={product.image} width={80} />
        <div>
          <b>{product.designerCategoryName}</b>
        </div>
        <div>{productName}</div>
      </div>
    );
  });

  return fetcedDataElements?.length > 0 ? (
    <div className="Modal">{fetcedDataElements}</div>
  ) : null;
};

export default ProductModal;
