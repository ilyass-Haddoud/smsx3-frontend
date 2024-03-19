import SideImage from "../../assets/login/c3tRg7Nt0Z.jpg";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

import "./login.css";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  return (
    <div className="login">
      <div className="login_sidedImage">
        <img src={SideImage} alt="suppliers_image" />
      </div>
      <div className="login_form">
        <form onSubmit={}>
          <header>Sign in</header>
          <div className="form_input_group">
            <label>Email or phone number</label>
            <input type="email" {...register("email")} />
          </div>
          <div className="form_input_group">
            <div className="password_metadata">
              <label>Password</label>
              <GoEyeClosed />
            </div>
            <input type="password" {...register("password")} />
          </div>
          <div className="form_input_group">
            <label>Select your role: </label>
            <select {...register("role")}>
              <option value="admin">Admin</option>
              <option value="supplier">Supplier</option>
              <option selected value="user">
                User
              </option>
            </select>
          </div>
          <button>Sign in</button>
          <div className="remember">
            <input type="checkbox" />
            <p>Remember me</p>
          </div>
          <footer>
            Don't have an account ? <strong>Sign up</strong>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default Login;
