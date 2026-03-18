import Container from "@/components/ui/Container";

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="page-shell py-[var(--space-10)]">
      <Container>{children}</Container>
    </main>
  );
}