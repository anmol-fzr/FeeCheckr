import { Chart } from "@/components/dashboard/Chart";

const Users = () => {
  console.log("Users");
  return (
    <div className=" grid grid-cols-4 gap-12 w-full">
      <Chart />
      <Chart />
      <Chart />
      <Chart />
    </div>
  );
};

export { Users };
