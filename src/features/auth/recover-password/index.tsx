import LoadingWave from "@/components/LoadingWave";
import { Link } from "react-router";
import { RecoveryForm } from "./form";

function PasswordRecovery() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-3 md:p-6">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <LoadingWave className="scale-50" />
          Coach Pulse
        </Link>

        <RecoveryForm />
      </div>
    </div>
  );
}

export default PasswordRecovery;
