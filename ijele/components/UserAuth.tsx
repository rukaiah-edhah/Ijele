import {
    RegisterLink,
    LoginLink,
    LogoutLink,
  } from "@kinde-oss/kinde-auth-nextjs/components";
  
  export default function UserAuth() {
    return (
      <div>
        <div>
          <LoginLink>
            <button className="btn mb-1 mt-1">Log in</button>
          </LoginLink>
        </div>
        <div>
          <RegisterLink>
            <button className="btn mb-1 mt-1">Register</button>
          </RegisterLink>
        </div>
        <div>
          <LogoutLink>
            <button className="btn mb-1 mt-1">Log out</button>
          </LogoutLink>
        </div>
      </div>
    );
  }
  