export function Footer() {
  return (
    <footer className="border-t border-border glass mt-20">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6 md:order-2">
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">About</span>
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Privacy</span>
            <span className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors">Terms</span>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-muted-foreground">
              &copy; 2026 Bridge2Better AI Platform. Building the future of mentorship.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
