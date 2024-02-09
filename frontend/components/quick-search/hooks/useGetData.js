import React from "react";
import axios from "axios";
import "regenerator-runtime";

const url = "http://localhost:3000/quick-search?searchString";
const defaultTextObject = { text: "", color: "black" };

const useGetData = () => {
  const [searchText, setSearchText] = React.useState("");
  const [fetchedData, setFetchedData] = React.useState({
    allData: {},
    isLoading: false,
  });
  const [errorMessage, setErrorMessage] = React.useState(defaultTextObject);

  const getSearchedData = async () => {
    try {
      setFetchedData({ allData: {}, isLoading: true });
      const searchedData = await axios.get(`${url}=${searchText}`);
      setErrorMessage(defaultTextObject);
      setFetchedData({ allData: searchedData, isLoading: false });
    } catch (error) {
      const { message } = error;
      if (message.includes("Network"))
        setErrorMessage({
          text: "Something wrong with network",
          color: "red",
        });
      if (message.includes("500"))
        setErrorMessage({
          text: "Something wrong with server",
          color: "red",
        });
    }
  };
  React.useEffect(() => {
    if (searchText.length > 0) getSearchedData();
    if (searchText.length === 0)
      setFetchedData({ allData: {}, isLoading: false });
  }, [searchText]);
  return {
    setSearchText,
    fetchedData,
    errorMessage,
    searchText,
    setErrorMessage,
  };
};

export default useGetData;
