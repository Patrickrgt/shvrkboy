import React from "react";

const PaginationMobile = (props) => {
  const { itemsCount, pageSize } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  // const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      {/* <ul className="pagination">
        {pages.map((page) => (
          <li key={page} className="page-item">
            <span
              className={
                page === currentPage ? "page-link active" : "page-link"
              }
              onMouseOver={() => onPageChange(page)}
            ></span>
          </li>
        ))}
      </ul> */}
    </nav>
  );
};

export default PaginationMobile;
