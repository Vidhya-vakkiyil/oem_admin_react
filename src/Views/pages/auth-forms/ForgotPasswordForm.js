import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// material-ui

// project imports


// redux slice
import { forgotPassword } from "../../../store/slices/authSlice";
import { AnimatedUI5Button } from "./AnimatedUI5Button";
import {
  BusyIndicator,
  Button,
  FlexBox,
  FormItem,
  Input,
  Label,
  MessageStrip,
} from "@ui5/webcomponents-react";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { forgotStatus, forgotMessage } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <>
      {forgotStatus !== "succeeded" && forgotMessage && (
        <MessageStrip
          design="Negative"
          hideCloseButton={false}
          hideIcon={false}
          style={{ marginBottom: "1rem" }}
        >
          {forgotMessage.message}
        </MessageStrip>
      )}

      {forgotStatus === "succeeded" && (
        <MessageStrip
          design="Positive"
          hideCloseButton={false}
          hideIcon={false}
          style={{ marginBottom: "1rem" }}
        >
          {forgotMessage}
        </MessageStrip>
      )}
      <form onSubmit={handleSubmit}>
        <FormItem
          label={<Label required>Email Address</Label>}
          style={{ marginBottom: "1rem" }}
        >
          <Input
            id="outlined-adornment-email-login"
            name="email"
            type="Email"
            value={email}
            required
            onInput={(e) => setEmail(e.target.value)}
          />
        </FormItem>

        <FlexBox
          justifyContent="SpaceBetween"
          alignItems="Center"
          style={{ marginBottom: "1rem" }}
        >
          <div /> {/* Empty left grid equivalent */}
          <Link
            href="/login"
            design="Emphasized" // Optional for styling
            style={{ textDecoration: "none" }}
          >
            Login?
          </Link>
        </FlexBox>

        <FlexBox
          direction="Column"
          style={{ marginTop: "1rem", width: "100%" }}
        >
          <Button
            design="Emphasized"
            type="Submit"
            disabled={forgotStatus === "loading"}
            style={{ width: "100%" }}
          >
            {forgotStatus === "loading" ? (
              <BusyIndicator active size="Small" />
            ) : (
              "Sent Mail"
            )}
          </Button>
        </FlexBox>
      </form>
    </>
  );
}
