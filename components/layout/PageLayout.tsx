import Container from "@/components/ui/Container";

type PageLayoutProps = {
  children: React.ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-h-screen py-12">
      <Container>{children}</Container>
    </main>
  );
}