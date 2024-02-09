import React from "react";
import { hot } from "react-hot-loader/root";
import "./QuickSearch.less";
import useGetData from "./hooks/useGetData";
import ProductModal from "./components/ProductModal/ProductModal";
import ErrorText from "./components/ErrorText/ErrorText";

export default hot(() => {
  const { setSearchText, fetchedData, errorMessage, searchText } = useGetData();

  const searchChangeHandler = (e) => {
    const enteredValue = e.target.value;
    setSearchText(enteredValue);
  };

  const areResultsEmpty =
    fetchedData?.data?.products?.length === 0 &&
    searchText.length > 0 &&
    errorMessage.text.length === 0;

  return (
    <div className="QuickSearch">
      <input onChange={searchChangeHandler} className="Input" />
      <ProductModal fetchedData={fetchedData} />
      {errorMessage.text.length > 0 ? (
        <ErrorText color={errorMessage.color}>{errorMessage.text}</ErrorText>
      ) : null}
      {areResultsEmpty ? (
        <ErrorText color={"black"}>
          Your search <b>{searchText}</b> did not return any results
        </ErrorText>
      ) : null}
    </div>
  );
});
