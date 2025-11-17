import RoleCard from "@/features/select-role/role-card";
import { roleGradients } from "@/lib/constants";
import { Button, buttonVariants } from "@/shared/ui/button";
import { Link } from "react-router";

function SelectRolePage() {
  return (
    <div className="grid grid-cols-3 overflow-y-hidden">
      <RoleCard
        description={
          "I want to organize my buisness, build plans, and register new customers."
        }
        title="I'm a Coach"
        src={"/coaches.jpg"}
        gradients={roleGradients[0]}
      >
        <Link
          className={buttonVariants({ variant: "default", className: "mt-3" })}
          to={"/auth/login"}
        >
          Get Started
        </Link>
      </RoleCard>
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
            className: "mt-3",
            colors: "user",
          })}
          to={"/auth/login"}
        >
          Switch To User
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
            colors: "supplier",
          })}
          to={"/auth/login"}
        >
          Switch To Supplier
        </Link>
      </RoleCard>
    </div>
  );
}

export default SelectRolePage;
