const FilterContent = ({statusFilters,filters,timeFilters,toggleFilter}) => (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-3">Order Status</h3>
        <div className="flex flex-col space-y-2">
          {statusFilters.map(status => (
            <button
              key={status}
              onClick={() => toggleFilter('status', status)}
              className={`px-4 py-2 rounded-full text-sm text-left transition-colors ${
                filters.status.includes(status)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray- 200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
  
      <div>
        <h3 className="text-sm font-semibold mb-3">Order Time</h3>
        <div className="flex flex-col space-y-2">
          {timeFilters.map(time => (
            <button
              key={time}
              onClick={() => toggleFilter('time', time)}
              className={`px-4 py-2 rounded-full text-sm text-left transition-colors ${
                filters.time.includes(time)
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </>
  );
  export default FilterContent