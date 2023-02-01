import orderBy from "lodash/orderBy";

export function applyFilter(filters, products) {
  const { sortBy } = filters;
  console.log("filter", filters);

  let filteredProducts = products;
  console.log("filterProducts", products);

  // SORT BY

  if (sortBy === "Top") {
    filteredProducts = orderBy(products, ["status"], ["Top"]);
  }
  if (sortBy === "New") {
    filteredProducts = orderBy(products, ["status"], ["New"]);
  }

  // FILTER PRODUCTS
  if (filters.types?.length > 0) {
    filteredProducts = products.filter((product) =>
      filters.types.includes(product.types)
    );
  }

  if (filters.priceRange) {
    filteredProducts = products.filter((product) => {
      if (filters.priceRange === "below") {
        return product.price < 4;
      }
      if (filters.priceRange === "between") {
        return product.price >= 4 && product.price <= 6;
      }
      return product.price > 6;
    });
  }
  if (filters.searchQuery) {
    filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  return filteredProducts;
}
