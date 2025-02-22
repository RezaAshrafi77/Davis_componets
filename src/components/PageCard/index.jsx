export const PageCard = ({ page, className, navigate, ...props }) => {
  return (
    <div
      className={`${"bg-background flex cursor-pointer hover:scale-105 transition-all flex-col items-center justify-center rounded-md border-2 border-formItem2 hover:border-success border-solid w-full"} ${className}`}
      onClick={() => navigate(page.link)}
      style={{
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.20)",
      }}
      {...props}
    >
      {page.image && (
        <img
          src={page.image}
          className={"w-full"}
          alt={page.title || "Page"}
          loading="lazy"
        />
      )}
      <div className="w-full flex justify-center items-center min-h-[60px] px-1">
        <strong
          className={
            "text-center font-600 hover:font-700  text-2xs lg:text-xs leading-5 xl:leading-6"
          }
        >
          {page.title || "Untitled Page"}
        </strong>
      </div>
    </div>
  );
};
