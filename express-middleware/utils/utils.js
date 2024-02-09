const fsPromise = require("fs/promises");

const readData = async (path) => {
  const data = await fsPromise.readFile(path, "utf-8");
  return data;
};

const convertToNumber = (value) => {
  if (isNaN(value)) return value;
  return Number(value);
};

const transformCSVtoJSON = (rawCSV, resultObjectKeys) => {
  const allRawData = rawCSV.split("\r");
  const updatedData = allRawData.reduce((newData, data, index) => {
    if (index === 0) return [];
    const cleanedData = data.replace(/\n/g, "");
    const dataObject = cleanedData.split(",");
    const firstItem = convertToNumber(dataObject[0]);
    const secondItem = convertToNumber(dataObject[1]);
    newData.push({
      [resultObjectKeys[0]]: firstItem,
      [resultObjectKeys[1]]: secondItem,
    });
    return newData;
  }, []);
  return updatedData;
};
const makeTree = ({
  categories,
  categoryParentChildMapping,
  rootCategoryId,
  tree = {},
}) => {
  tree.id = rootCategoryId;
  tree.name = categories.find((cat) => cat.categoryId === rootCategoryId).name;
  tree.children = [];
  categoryParentChildMapping.forEach((childMap) => {
    if (childMap.parentId === tree.id) {
      tree.children.push({
        id: childMap.categoryId,
        name: categories.find((cat) => cat.categoryId === childMap.categoryId)
          .name,
        children: [],
      });
    }
  });
  tree.children.forEach((child) => {
    makeTree({
      categories,
      categoryParentChildMapping,
      rootCategoryId: child.id,
      tree: child,
    });
  });
  return tree;
};

module.exports = { makeTree, readData, transformCSVtoJSON };
