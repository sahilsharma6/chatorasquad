export default function CustomerPagination({currentPage,itemsPerPage,filteredAndSortedData,setCurrentPage,totalPages}){
    return (
        <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} entries
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all delay-100"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all delay-100"
          >
            Next
          </button>
        </div>
      </div>
    )
}