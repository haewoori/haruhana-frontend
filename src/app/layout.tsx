'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { usePathname } from 'next/navigation';
import NavigationBar from '@/components/NavigationBar';
import './globals.css';

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    const pathname = usePathname();
    const showNavigation = pathname !== '/';

    return (
        <html lang="ko">
        <head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </head>
        <body style={{ margin: 0, padding: 0 }}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div style={{ paddingBottom: showNavigation ? '5rem' : '0' }}>
                    {children}
                </div>
                {showNavigation && <NavigationBar />}
            </PersistGate>
        </Provider>
        </body>
        </html>
    );
}