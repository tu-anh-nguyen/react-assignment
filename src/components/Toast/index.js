import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToast } from "../../redux/actions";
import styles from "./Toast.module.css";
import PropTypes from "prop-types";

const Toast = ({ timeout = 3000 }) => {
  const toastlist = useSelector((state) => state.toastSlice);
  const dispatch = useDispatch();
  const closeToast = useCallback(
    (id) => () => {
      dispatch(deleteToast(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastlist.length) {
        dispatch(deleteToast(toastlist[0].id));
      }
    }, timeout);

    return () => {
      clearInterval(interval);
    };
  }, [toastlist, timeout, dispatch]);

  return (
    <div className={`${styles.container} ${styles.topRight}`}>
      {toastlist.map((toast, i) => (
        <div
          key={i}
          className={`${styles.notification} ${styles.toast} ${styles.topRight}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button onClick={closeToast(toast.id)}>
            <i class="fa-solid fa-circle-xmark"></i>
          </button>
          <div className={styles.notificationBox}>
            <p className={styles.title}>{toast.title}</p>
            <p className={styles.description}>{toast.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

Toast.prototype = {
  timeout: PropTypes.number,
};

export default Toast;
