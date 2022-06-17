import { useContext } from "react";
import { ToastContext } from "../components/Toast";

export default function withToast(Component) {
  function ComponentWithRouterProp(props) {
    let { addToast } = useContext(ToastContext);
    return <Component {...props} addToast={addToast} />;
  }
  return ComponentWithRouterProp;
}
