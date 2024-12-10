import { useState } from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";
import * as EmailValidator from "email-validator";

import IconList from "../../assets/images/icon-list.svg";
import IlluStrationDesktop from "../../assets/images/illustration-sign-up-desktop.svg";
import IlluStrationMobile from "../../assets/images/illustration-sign-up-mobile.svg";
import SuccessIcon from "../../assets/images/icon-success.svg";
import { Input } from "../../types";
import styles from "./Home.module.scss";

const Home = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Input>();

  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data);

    // dummy submission of form
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      reset();
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <main className={styles.main}>
      <div
        className={classNames({
          [styles.formBox]: true,
          [styles.hide]: showSuccess,
        })}
      >
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Stay updated!</h1>
          <h2 className={styles.desc}>
            Join 60,000+ product managers receiving monthly updates on:
          </h2>
          <div className={styles.listContainer}>
            <div className={styles.item}>
              <img src={IconList} alt="icon-list" />
              <span>Product discovery and building what matters</span>
            </div>
            <div className={styles.item}>
              <img src={IconList} alt="icon-list" />
              <span>Measuring to ensure updates are a success</span>
            </div>
            <div className={styles.item}>
              <img src={IconList} alt="icon-list" />
              <span>And much more!</span>
            </div>
          </div>
          <form
            className={classNames({
              [styles.form]: true,
              [styles.error]: errors.email,
            })}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={styles.labelContainer}>
              <label htmlFor="email">Email address</label>
              <span className={styles.error}>{errors.email?.message}</span>
            </div>
            <input
              type="text"
              id="email"
              placeholder="email@company.com"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                validate: (value) =>
                  EmailValidator.validate(value) || "Valid Email required",
              })}
            />
            <button className={styles.btn} type="submit" disabled={loading}>
              Subscribe to monthly newsletter
            </button>
          </form>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.desktop}
            src={IlluStrationDesktop}
            alt="illustration-sign-up"
          />
          <img
            className={styles.mobile}
            src={IlluStrationMobile}
            alt="illustration-sign-up"
          />
        </div>
      </div>

      <div
        className={classNames({
          [styles.successBox]: true,
          [styles.show]: showSuccess,
        })}
      >
        <img src={SuccessIcon} alt="success-icon" />
        <h2 className={styles.title}>Thanks for subscribing!</h2>
        <span className={styles.desc}>
          A confirmation email has been sent to{" "}
          <span className={styles.active}>ash@loremcompany.com</span>. Please
          open it and click the button inside to confirm your subscription.
        </span>
        <button className={styles.btn} onClick={() => setShowSuccess(false)}>
          Dismiss message
        </button>
      </div>
    </main>
  );
};

export default Home;
