import SideImage from "../../assets/login/c3tRg7Nt0Z.jpg";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import "./login.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import loginSchema from "./loginValidation";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });
  console.log(errors);
  return (
    <div className="login">
      <div className="login_sidedImage">
        <img src={SideImage} alt="suppliers_image" />
      </div>
      <div className="login_form">
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <header>Sign in</header>
          <div className="form_input_group">
            <label>Email or phone number</label>
            <input type="email" {...register("email")} />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form_input_group">
            <div className="password_metadata">
              <label>Password</label>
              <GoEyeClosed />
            </div>
            <input type="password" {...register("password")} />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>
          <div className="form_input_group">
            <label>Select your role: </label>
            <select {...register("role")} defaultValue="user">
              <option value="admin">Admin</option>
              <option value="supplier">Supplier</option>
              <option value="user">User</option>
            </select>
          </div>
          <button>Sign in</button>
          <div className="remember">
            <input type="checkbox" {...register("remember")} />
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
