import { ReactNode } from "react";
import { H1 } from "./typography";

type PageProps = {
  title: string;
  Header: () => ReactNode;
  children: ReactNode;
};

const Page = ({ title, Header, children }: PageProps) => (
  <div className="h-fit space-y-4 ">
    <div className="flex justify-between ">
      <H1>{title}</H1>
      <Header />
    </div>

    {children}
  </div>
);

export { Page };
