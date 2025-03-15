import ElectionBlock from "@/components/ElectionBlock";
const ElectionsPage = () => {
  return (
    <div className="container my-20 px-3 mx-auto flex flex-col justify-between items-center gap-4 md:gap-12">
      <h2 className="place-self-start text-3xl font-bold">Elections</h2>
      <ElectionBlock />
      <ElectionBlock />
    </div>
  );
};

export default ElectionsPage;
