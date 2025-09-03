export default function BuildStamp() {
  const sha =
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    "";
  const short = sha ? sha.slice(0, 7) : "dev";
  return (
    <div className="text-[11px] text-muted-foreground my-8 opacity-60">
      build: {short}
    </div>
  );
}