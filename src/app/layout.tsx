'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import './globals.css';

export default function RootLayout({children,}: { children: React.ReactNode; }) {
    return (
        <html lang="ko">
        <body style={{ margin: 0, padding: 0 }}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
        </body>
        </html>
    );
}