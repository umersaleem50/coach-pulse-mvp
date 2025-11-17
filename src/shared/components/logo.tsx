function Logo({ iconOnly }: { iconOnly?: boolean }) {
  return (
    <>
      <div className="flex size-10 items-center justify-center rounded-md">
        <img
          src={"/coach-pulse-icon.png"}
          width={40}
          height={40}
          alt="Coach Pulse Logo"
          className="object-fill"
        />
      </div>
      {!iconOnly && <p className="font-sans">Coach Pulse</p>}
    </>
  );
}

export default Logo;
