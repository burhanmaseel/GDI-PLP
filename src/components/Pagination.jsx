
/**
 * Pagination component to navigate through pages of products
 * @param {object} props
 * @param {number} props.currentPage - The current page number
 * @param {number} props.totalPages - The total number of pages available
 * @param {function} props.onPageChange - Callback function to handle page changes
 * @param {boolean} props.loading - Indicates if the page is currently loading
 * @param {boolean} props.hasPrevious - Indicates if there is a previous page available
 * @param {boolean} props.hasNext - Indicates if there is a next page available
 */
const Pagination = ({ currentPage, totalPages, onPageChange, loading, hasPrevious, hasNext }) => {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious || loading}
      >
        Previous
      </button>

      <span className="page-info">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext || loading}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;