import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// material-ui

// assets

// redux slice
import { login } from "../../../store/slices/authSlice";
import {
  BusyIndicator,
  Button,
  Card,
  CheckBox,
  FlexBox,
  FormItem,
  Icon,
  Input,
  Label,
  MessageStrip,
  Title,
} from "@ui5/webcomponents-react";

export default function AuthLogin() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/UserDashboard");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials));
  };

  return (
    <>
      {error && (
        <MessageStrip
          design="Negative" // For "error" severity
          hideCloseButton={false}
          hideIcon={false}
          style={{ marginBottom: "1rem" }}
        >
          {error.message}
        </MessageStrip>
      )}
      <FlexBox
        direction="Column"
        justifyContent="Center"
        alignItems="Center"
        style={{ height: "100vh", backgroundColor: "#f3f6f9" }}
      >
        <Card
          style={{
            padding: "2rem",
            width: "400px",
            borderRadius: "1rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
          <FlexBox
            direction="Column"
            alignItems="Center"
            style={{ marginBottom: "1.5rem" }}
          >
            <Title
              level="H3"
              style={{ marginBottom: "0.25rem", fontWeight: "bold" }}
            >
              OEM
            </Title>
            <Title
              level="H5"
              style={{ color: "#7e57c2", marginBottom: "0.25rem" }}
            >
              Hi, Welcome Back
            </Title>
            <Label style={{ fontSize: "0.875rem", color: "#666" }}>
              Enter your credentials to continue
            </Label>
          </FlexBox>

          {error && (
            <MessageStrip design="Negative" style={{ marginBottom: "1rem" }}>
              {error}
            </MessageStrip>
          )}
        
         
          <FormItem   label="Email Address / Username">
            <Input
              type="Email"
              value={credentials.email}
              name="email"
              placeholder="Enter email"
              onInput={(e) =>
                handleChange({
                  target: { name: "email", value: e.target.value },
                })
              }
            />
          </FormItem>

          <FormItem label="Password">
            <Input
              type={showPassword ? "Text" : "Password"}
              value={credentials.password}
              name="password"
              placeholder="Enter password"
              onInput={(e) =>
                handleChange({
                  target: { name: "password", value: e.target.value },
                })
              }
              icon={<Icon name={showPassword ? "hide" : "show"} />}
              onIconClick={() => setShowPassword(!showPassword)}
              showIcon
            />
          </FormItem>

          <FlexBox
            justifyContent="SpaceBetween"
            alignItems="Center"
            style={{ margin: "1rem 0" }}
          >
            <CheckBox
              text="Keep me logged in"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <Link
              href="/forgot-password"
              design="Emphasized"
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>{" "}
          </FlexBox>

          <Button
            design="Emphasized"
            disabled={status === "loading"}
            onClick={handleSubmit} // Replace with your form submit handler
            style={{ width: "100%" }}
          >
            {status === "loading" ? (
              <BusyIndicator size="Small" active />
            ) : (
              "Sign In"
            )}
          </Button>
        </Card>
      </FlexBox>
    </>
  );
}
