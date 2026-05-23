export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <main className="space-y-32 py-12">{children}</main>;
}
