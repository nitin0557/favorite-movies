import React from "react";

interface KPIProps {
  title: string;
  value: string | number;
}

const KPI: React.FC<KPIProps> = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4 text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default KPI;
