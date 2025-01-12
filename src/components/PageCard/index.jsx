export const PageCard = ({ page, className, navigate, ...props }) => {
  return (
    <div
      className={`${"bg-formItem aspect-square flex cursor-pointer flex-col items-center justify-center gap-2 px-4 py-3 transition-transform hover:scale-105 md:gap-3 max-h-fit"} ${className}`}
      onClick={() => navigate(page.link)}
      style={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)",
      }}
      {...props}
    >
      {page.image && (
        <img
          src={page.image}
          className={
            "h-12 w-12 rounded-md object-cover transition-transform md:h-16 md:w-16 lg:h-20 lg:w-20 xl:h-24 xl:w-24 hover:scale-110"
          }
          alt={page.title || "Page"}
          loading="lazy"
        />
      )}
      <strong
        className={
          "text-3xs text-center font-600 text-gray-800 md:text-xs lg:text-xs xl:text-sm"
        }
      >
        {page.title || "Untitled Page"}
      </strong>
    </div>
  );
};
