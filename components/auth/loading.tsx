import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-screen fixed z-50 w-full flex flex-col items-center justify-center">
      <Image
        src={require("../../public/logo.svg")}
        alt="Miro"
        width={120}
        height={120}
        className="animate-pulse duration-1000"
      />
    </div>
  );
};
