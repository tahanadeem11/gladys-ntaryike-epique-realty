import Image from "next/image";

export default function Preloader() {
  return (
    <div className="preloader" aria-hidden>
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/logo.png"
          alt=""
          width={612}
          height={408}
          priority
          className="h-auto w-64 sm:w-80"
          style={{ animation: "logo-in 0.9s var(--ease-out-expo) both" }}
        />
        <div className="preloader-bar" />
      </div>
    </div>
  );
}
