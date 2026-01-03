import { useState } from "react";

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", paddingRight: "17px" }}
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Welcome Back!</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label className="prelabel" htmlFor="email">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@email.com"
                />
              </div>
              <div className="form-group">
                <label className="prelabel" htmlFor="password">
                  Password
                </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                />
              </div>

              <div className="form-group login-btn mb-0">
                <button className="btn btn-primary btn-block">Login</button>
              </div>
            </form>
            <div className="text-center mt-3">
              <a className="link-highlight">Forgot password?</a>
            </div>
          </div>
          <div className="modal-footer text-center">
            <p>
              Don&#39;t have an account?{" "}
              <a className="link-highlight">Register</a>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </div>
  );
};

export default LoginModal;
