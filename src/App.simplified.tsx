import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Vereenvoudigde placeholders voor pagina's
const Landing = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold mb-4">PitchPro Landing Page</h1>
    <p className="mb-4">Welkom bij PitchPro - Het platform voor werkzoekenden en recruiters</p>
    <div className="flex space-x-4">
      <a href="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
      <a href="/register" className="px-4 py-2 bg-gray-200 rounded">Registreren</a>
    </div>
  </div>
);

const Login = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Login</h1>
    <p>Login pagina (vereenvoudigd)</p>
  </div>
);

const Register = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Registreren</h1>
    <p>Registratie pagina (vereenvoudigd)</p>
  </div>
);

const About = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Over PitchPro</h1>
    <p>Over ons pagina (vereenvoudigd)</p>
  </div>
);

const NotFound = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">404 - Pagina niet gevonden</h1>
    <p>De pagina die je zoekt bestaat niet.</p>
    <a href="/" className="text-blue-500 hover:underline">Terug naar home</a>
  </div>
);

// Vereenvoudigde App component zonder Firebase of andere complexe dependencies
const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto p-4 flex justify-between items-center">
            <div className="font-bold text-xl text-blue-600">PitchPro</div>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-blue-500">Home</a></li>
                <li><a href="/about" className="hover:text-blue-500">Over ons</a></li>
                <li><a href="/login" className="hover:text-blue-500">Login</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App; 