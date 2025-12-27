import Logo from "@/shared/components/logo";
import { Link, Outlet } from "react-router";
import RoleCard from "../select-role/role-card";

import { buttonVariants } from "@/shared/components/ui/button";
import { roleGradients } from "@/constants";

function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <Logo />
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="bg-primary relative grid md:grid-cols-2 grid-cols-1 h-auto overflow-hidden">
        <RoleCard
          description={
            "I'm want to keep track of my progress, workout plans, fitness, and diet."
          }
          title="I'm a User"
          src={"/clients.jpg"}
          gradients={roleGradients[1]}
        >
          <Link
            className={buttonVariants({
              variant: "default",
              className: "mt-3 bg-us",
            })}
            to={"/auth/login"}
          >
            Create User Account
          </Link>
        </RoleCard>
        <RoleCard
          description={
            "I want to grow my buisness, offer suppliments, and manage my store."
          }
          title="I'm a supplier"
          src={"/supplier.jpg"}
          gradients={roleGradients[2]}
        >
          <Link
            className={buttonVariants({
              variant: "default",
              className: "mt-3",
            })}
            to={"/auth/login"}
          >
            Create Supplier Account
          </Link>
        </RoleCard>
      </div>
    </div>
  );
}

export default AuthLayout;
