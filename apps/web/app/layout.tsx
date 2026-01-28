"use client";
import "@repo/ui/globals.css";
import { Toaster } from "sonner";
import { Provider } from 'react-redux';
import { store } from '../redux/api';
import AuthProvider from '../provider/AuthProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Provider store={store}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Provider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
