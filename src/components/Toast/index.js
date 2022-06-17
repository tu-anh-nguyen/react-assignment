import React, { Component, createContext } from "react";
import { ToastColor, ToastType } from "../../constants/toast";
import styles from "./Toast.module.css";

const ToastContext = createContext({
  toast: [],
  addToast: ({ title, description, type }) => {},
});

export default class ToastProvider extends Component {
  constructor(props) {
    super(props);
    this.timeout = 3000;
    this.state = {
      toasts: [],
    };
  }
  addToast({ title, description, type = ToastType.SUCCESS }) {
    const { toasts } = this.state;
    const idx = (toasts?.[toasts?.length - 1]?.id || 0) + 1;
    const newToast = {
      id: idx,
      title: title || ToastColor[type].title,
      description: description,
      backgroundColor: ToastColor[type].backgroundColor,
    };
    this.setState({ toasts: [...toasts, newToast] });
  }

  deleteToast(id) {
    let { toasts } = this.state;
    if (!toasts.length) return;
    const idx = toasts.findIndex((element) => id === element.id);
    if (idx === -1) return;
    const newToasts = toasts.filter((element) => element.id !== id);
    this.setState({ toasts: newToasts });
  }
  componentDidUpdate(_, prevState) {
    const preToasts = prevState.toasts;
    const curToasts = this.state.toasts;
    if (curToasts.length && preToasts.length !== curToasts.length) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        curToasts.pop();
        this.setState({ toasts: curToasts });
      }, this.timeout);
    }
  }

  render() {
    const context = {
      toasts: this.state.toasts,
      addToast: this.addToast.bind(this),
    };
    return (
      <ToastContext.Provider value={context}>
        <div className={`${styles.container} ${styles.topRight}`}>
          {this.state.toasts.map(
            ({ id, title, description, backgroundColor }) => (
              <div
                key={id}
                className={`${styles.notification} ${styles.toast} ${styles.topRight}`}
                style={{ backgroundColor: backgroundColor }}
              >
                <button onClick={() => this.deleteToast(id)}>
                  <i className="fa-solid fa-circle-xmark"></i>
                </button>
                <div className={styles.notificationBox}>
                  <p className={styles.title}>{title}</p>
                  <p className={styles.description}>{description}</p>
                </div>
              </div>
            )
          )}
        </div>
        {this.props.children}
      </ToastContext.Provider>
    );
  }
}

export { ToastContext };
