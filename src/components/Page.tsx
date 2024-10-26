import { ReactNode } from "react";
import { PageHeader, PageHeaderProps } from "./custom";

type PageProps = PageHeaderProps & {
  Header: () => ReactNode;
  children: ReactNode;
};

const Page = ({
  title = "",
  desc,
  Header = () => <></>,
  children,
}: PageProps) => {
  desc ??= `Manage All ${title}.`;
  return (
    <div className="h-fit space-y-4 ">
      <div className="flex justify-between ">
        <PageHeader title={title} desc={desc} />
        <Header />
      </div>

      {children}
    </div>
  );
};

export { Page };
