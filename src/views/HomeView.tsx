import { Button } from '@/components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [keyIsSet, setKeyIsSet] = useState(false);
  
  useEffect(
    () => {
      const saved = localStorage.getItem('tmdb_key') || ''; // key persists on refresh
      setKey(saved); 
      setKeyIsSet(Boolean(saved));
    }, []
  );
  
  const saveKey = () => {
    const trimmed = key.trim();
    if (trimmed) {
      localStorage.setItem('tmdb_key', trimmed);
      setKeyIsSet(true);
    } else {
      localStorage.removeItem('tmdb.key');
      setKeyIsSet(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <section className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">TMDB Explorer</h1>
        <p className="text-gray-400 text-lg">Explore movies and discover people using a fast, modern interface.</p>
        <div> 
          <div className="flex gap gap-2 justify-center flex-col">
            <p className={keyIsSet ? 'text-teal-400' : 'text-grey-400'}>{keyIsSet ? 'Key set!' : 'Key not set'}</p>
            <Button onClick={saveKey}>Set Key</Button>
          </div>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="mt-4 bg-black"
          >
          </input>
        </div>
        <Button 
          onClick={() => { 
            saveKey(); navigate('/movies/now_playing')
          }}
        >
            Enter
        </Button>
        <footer className="pt-10 text-sm text-gray-500">Built with React, Vite and React Router</footer>
      </section>
    </main>
  );
};