import {
    RegisterLink,
    LoginLink,
    LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function UserAuth() {
    return (
        <div>
            <div>
                <LoginLink>Log in</LoginLink>
            </div>
            <div>
                <RegisterLink>Register</RegisterLink>
            </div>
            <div>
                <LogoutLink>Log out</LogoutLink>
            </div>
        </div>
    );
}
