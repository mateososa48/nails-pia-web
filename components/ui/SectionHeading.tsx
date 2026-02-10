interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  variant?: "default" | "landing";
  gradient?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  variant = "default",
  gradient = false,
}: SectionHeadingProps) {
  const isLanding = variant === "landing";
  const gradientClass = gradient ? " bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender" : "";

  return (
    <div className={isLanding ? "text-center mb-6 md:mb-8" : "text-center mb-12"}>
      <h2
        className={
          isLanding
            ? `text-4xl md:text-5xl tracking-tight mb-2 font-display${gradientClass}`
            : `text-3xl md:text-4xl tracking-tight mb-3 font-display${gradientClass}`
        }
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={
            isLanding
              ? "text-black/60 text-base md:text-lg max-w-md mx-auto font-sans"
              : "text-black/60 text-lg max-w-md mx-auto font-sans"
          }
        >
          {subtitle}
        </p>
      )}
      <div
        className={
          isLanding
            ? "mt-3 mx-auto w-12 h-1 rounded-full bg-gradient-to-r from-pink to-lavender"
            : "mt-4 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-pink to-lavender"
        }
      />
    </div>
  );
}
