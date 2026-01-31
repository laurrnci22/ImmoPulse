import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { PropertiesList } from './components/PropertiesList';

export default function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'properties'>('properties');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main>
        {currentView === 'dashboard' ? <Dashboard /> : <PropertiesList />}
      </main>
    </div>
  );
}
