export const getPageNumber = (doc) => {
  const page =
    doc?.metadata?.loc?.pageNumber ??
    doc?.metadata?.pageNumber ??
    doc?.metadata?.pdf?.pageNumber;

  if (typeof page === "number") {
    return page;
  }

  return null;
};