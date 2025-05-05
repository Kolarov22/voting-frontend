import Dashboard from "@/components/Dashboard";
import ElectionAddDropdown from "@/components/ElectionAddDropdown";
import ElectionModifyDropdown from "@/components/ElectionModifyDropdown";

const AdminPage = () => {
  return (
    <div className="m-2">
      <Dashboard />
      <div className="flex flex-col items-center md:items-start md:flex-row gap-2 mt-4">
        <ElectionAddDropdown />
        <ElectionModifyDropdown />
      </div>
    </div>
  );
};

export default AdminPage;
