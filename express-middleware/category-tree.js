const path = require("path");
const { readData, transformCSVtoJSON, makeTree } = require("./utils");

const dataPath = path.resolve(__dirname, "../data");
const ROOT_CATEGORY_ID = 2;
module.exports = async (req, res) => {
  const categoriesData = await readData(`${dataPath}/categories.csv`);
  const categoryParentChildMappingData = await readData(
    `${dataPath}/category-parent-child-mapping.csv`
  );
  const categories = transformCSVtoJSON(categoriesData, ["categoryId", "name"]);
  const categoryParentChildMapping = transformCSVtoJSON(
    categoryParentChildMappingData,
    ["categoryId", "parentId"]
  );
  const categoryTree = makeTree({
    categories,
    categoryParentChildMapping,
    rootCategoryId: ROOT_CATEGORY_ID,
  });
  res.json(categoryTree);
};
