import { useLocation, useParams } from "react-router-dom";

const useRouteParam = <T = string>(paramName: string) => {
  const params = useParams();
  const { pathname } = useLocation();

  const param = params[paramName];

  if (!param) {
    throw new Error(paramName + " Not Found on " + pathname);
  }

  return param as T;
};

export { useRouteParam };
