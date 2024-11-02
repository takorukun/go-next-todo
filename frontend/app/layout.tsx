// app/layout.tsx
import { ReactNode } from 'react';

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <header>
                    <h1>My ToDo App</h1>
                </header>
                <main>{children}</main>
                <footer>
                    <p>© 2024 My ToDo App</p>
                </footer>
            </body>
        </html>
    );
}
