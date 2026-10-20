import Loader from "@/components/ui/Loader/Loader";

// Shown while the home page streams in, e.g. when switching language. It sits
// in the (home) group so it doesn't wrap the catch-all 404 route: a loading
// boundary there would start streaming first and turn the 404 into a 200.
export default function LocaleLoading() {
  return (
    <main id="content" tabIndex={-1} className="page-loading">
      <Loader />
    </main>
  );
}
