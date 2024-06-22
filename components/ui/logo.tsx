interface LogoProps {
  width: number;
  height: number;
}

import Image from "next/image";

const Logo = ({ width, height }: LogoProps) => {
  return (
    <Image
      src={require("../../public/logo.svg")}
      alt="Miro"
      width={width}
      height={height}
    />
  );
};

export default Logo;
