export const Loader = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-y-4">
      <div className="w-10 h-10 relative animate-spin">
        <img
          alt="logo"
          src="/logo.png"
        />
      </div>
      <p className="text-sm text-muted-foreground">Cleverly thinking on your query...</p>
    </div>
  )
};