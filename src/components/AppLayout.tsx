interface AppLayoutProps {
  toggleTheme: () => void;
  currentMode: "light" | "dark";
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
