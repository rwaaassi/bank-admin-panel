import { useState } from "react";

const FilterUsers = ({ usersData, setFilteredUsers }) => {
  const [cashFilter, setCashFilter] = useState("");
  const [creditFilter, setCreditFilter] = useState("");

  const handleFilter = () => {
    const filtered = usersData.filter(
      (user) => user.cash >= cashFilter && user.credit >= creditFilter
    );
    setFilteredUsers(filtered);
  };

  return (
    <div>
      <input
        type="number"
        value={cashFilter}
        onChange={(e) => setCashFilter(e.target.value)}
        placeholder="Min Cash"
      />
      <input
        type="number"
        value={creditFilter}
        onChange={(e) => setCreditFilter(e.target.value)}
        placeholder="Min Credit"
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default FilterUsers;
