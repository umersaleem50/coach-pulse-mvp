import { cn } from "@/shared/lib/utils";

function RoleCard({
  src,
  title,
  description,
  children,
  gradients,
}: {
  src: string;
  title: string;
  description: string;
  children: React.ReactNode;
  gradients: string;
}) {
  return (
    <div className={cn("w-full h-full md:h-auto relative group ", gradients)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-500"></div>

      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150",
          gradients
        )}
      ></div>
      <div className="flex justify-center bg-foreground py-2 sm:py-4 md:py-6 lg:py-8 px-10 h-1/3 w-full gap-y-2 flex-col text-center bottom-0  group-hover:bottom-0 sm:-bottom-full sm:opacity-0  group-hover:opacity-100 transition-all duration-500 z-10 absolute left-1/2 -translate-x-1/2 items-center">
        <h2 className="text-2xl font-semibold text-muted font-serif">
          {title}
        </h2>
        <p className="text-base text-muted-foreground">{description}</p>
        {children}
      </div>
      <img
        src={src}
        className="h-full w-full object-cover brightness-20 opacity-80 group-hover:brightness-40 -z-10"
      />
    </div>
  );
}

export default RoleCard;
