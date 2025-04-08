const ElectionBlock = () => {
  return (
    <div className="inline-flex justify-between items-center text-black p-4 rounded-lg shadow-md gap-3 md:gap-6 bg-slate-100">
      <div>
        <h2 className="text-xl font-semibold">Election Name</h2>
        <p className="text-sm">
          Election description, lorem ipsum dolor sit amet consectetur
          adipisicing elit.
        </p>
      </div>

      <div>
        <p>Remanining time: 27:37</p>
      </div>

      <div>
        <button className="bg-purple-accent hover:bg-purple-cta text-white px-4 py-2 rounded-lg">
          View Election
        </button>
      </div>
    </div>
  );
};

export default ElectionBlock;
