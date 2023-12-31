import { useState } from "react";
import { connect } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import Layout from "@components/layout";
import Header from "@components/header";
import Content from "@components/content";
import { resetPassword } from "@actions/user";
import { setNotification, setToken } from "@actions/notification";
import s from "./styles.module.css";

// TODO: Fix types.
interface Props {
  resetPassword: Function;
  notification: Array<String>;
  setNotification: Function;
  setToken: Function;
}

const PasswordReset: React.FC<Props> = ({
  resetPassword,
  notification,
  setNotification,
  setToken,
}) => {
  const [form, setForm] = useState({
    processing: false,
    valid: false,
    submitted: false,
    error: null,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  // const navigate = useNavigate();
  const hasTokenEmail =
    searchParams.get("token") && searchParams.get("email") ? true : false;
  const [data, setData] = useState(
    hasTokenEmail
      ? { email: searchParams.get("email"), token: searchParams.get("token") }
      : {}
  );

  const submit = (event) => {
    event.preventDefault();

    const fields = document.querySelectorAll("#resetForm input,select");
    let valid = true;

    for (let x = 0; x < fields.length; x++) {
      fields[x].setAttribute("data-valid", fields[x].validity.valid ? 1 : 0);

      if (!fields[x].validity.valid && valid) {
        valid = false;
      }
    }

    if (valid && hasTokenEmail) {
      valid = fields[0].value === fields[1].value;
    }

    if (valid) {
      resetPassword(data, (res) => {
        setNotification({
          display: true,
          error: res.success ? false : true,
          content: res.message,
          timed: res.success ? false : true,
        });

        if (!res.success) {
          setForm({ ...form, processing: false });
        }
      });
    }

    setForm({ ...form, valid: valid, submitted: true, processing: valid });

    return false;
  };

  const updateField = (event) => {
    const node = event.target;
    const key = node.getAttribute("name");

    if (form.submitted) {
      node.setAttribute("data-valid", node.validity.valid ? 1 : 0);
    }

    setData({ ...data, [key]: node.value });
  };

  // const redirect = (e) => {
  // 	e.preventDefault();

  // 	navigate(e.target.getAttribute('href'));
  // }

  return (
    <Layout style={{ maxWidth: "600px" }}>
      <Header title="Reset" />
      <Content style={{ paddingTop: "3.5rem" }}>
        <form
          id="resetForm"
          onSubmit={submit}
          className={s.form}
          autoComplete="off"
          noValidate
        >
          {hasTokenEmail && (
            <>
              <div role="presentation">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onKeyUp={updateField}
                  readOnly={form.processing}
                  autoComplete="off"
                  required
                />
              </div>
              <div role="presentation">
                <label htmlFor="password_confirmation">Confirm</label>
                <div className={s.passError}>
                  <input
                    id="password_confirmation"
                    name="password_confirmation"
                    type="password"
                    onKeyUp={updateField}
                    readOnly={form.processing}
                    autoComplete="off"
                    required
                  />
                  {form.submitted &&
                    data.password &&
                    data.password !== data.password_confirmation && (
                      <small>Passwords do not match!</small>
                    )}
                </div>
              </div>
            </>
          )}
          {!hasTokenEmail && (
            <div role="presentation">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onKeyUp={updateField}
                readOnly={form.processing}
                autoComplete="off"
                required
              />
            </div>
          )}
          {!hasTokenEmail && (
            <p>
              Enter your email address and you will receive a password reset
              link.
            </p>
          )}
          {hasTokenEmail && (
            <>
              <input
                name="token"
                type="hidden"
                value={searchParams.get("token")!}
              />
              <input
                name="email"
                type="hidden"
                value={searchParams.get("email")!}
              />
            </>
          )}
          <div role="presentation">
            <button disabled={form.processing} />
          </div>
        </form>
        <Link to="/login">
          Back to <br />
          Login
        </Link>
      </Content>
    </Layout>
  );
};

// const mapStateToProps = ({ notification }: any) => ({ notification });
const mapStateToProps = ({}) => ({});
const mapDispatchToProps = (dispatch: Function) => ({
  resetPassword: (data: any, callback: () => void) =>
    dispatch(resetPassword(data, callback)),
  setNotification: (data: any) => dispatch(setNotification(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
