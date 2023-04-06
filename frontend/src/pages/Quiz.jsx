const Quiz = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-1/2 flex justify-between mb-3 font-semibold">
        <span>Quesion 1/10</span>
        <span>Biology</span>
      </div>

      <div className="card w-1/2 bg-neutral text-neutral-content mb-10">
        <div className="card-body items-center text-center">
          <h2 className="card-title">
            Which kingdom has species whose cells do not have a cell wall?
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-1/2 p-4 mb-4">
        <div className="form-control card bg-base-200 p-2">
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-red-500"
              checked
            />
            <span className="label-text font-medium">Animalia</span>
          </label>
        </div>
        <div>
          <div className="form-control card bg-base-200 p-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                checked
              />
              <span className="label-text font-medium">Bacteria</span>
            </label>
          </div>
        </div>
        <div>
          <div className="form-control card bg-base-200 p-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-yellow-500"
                checked
              />
              <span className="label-text font-medium">Plantae</span>
            </label>
          </div>
        </div>
        <div>
          <div className="form-control card bg-base-200 p-2">
            <label className="label cursor-pointer">
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-green-500"
                checked
              />
              <span className="label-text font-medium">Protista</span>
            </label>
          </div>
        </div>
      </div>
      <div className="">
        <button className="btn btn-outline btn-square w-32">
          <span>Next</span>
        </button>
      </div>
    </div>
  );
};

export default Quiz;
