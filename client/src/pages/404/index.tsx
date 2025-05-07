import {useRouteError, isRouteErrorResponse} from "react-router-dom";

export default function NotFound() {
  // Need to know does the error is from notfound route accessed or other.
  const error = useRouteError();
  const isRouteErr: boolean = isRouteErrorResponse(error);

  return (
    <div>
      <h1>{isRouteErr ? "Page Not Found" : "Something Went Wrong !"}</h1>
    </div>
  );
}
