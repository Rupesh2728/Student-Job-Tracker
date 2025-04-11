import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    // Get user data from localStorage when component mounts
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Get first letter of user's name and capitalize it
        if (user.name) {
          setUserInitial(user.name.charAt(0).toUpperCase());
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem('user');
    // You can also use localStorage.clear() if you want to clear all localStorage items
    
    console.log("User logged out, localStorage cleared");
    
    // Redirect to login page after logout
    navigate('/signin');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
 
        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">JobTracker</h1>
          </div>
          
          <div className="relative flex items-center">
            
          <div className="flex space-x-2">
         
          <div className='md:block xs:hidden'>
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center px-3 py-2 mr-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <LogOut size={17} className="mr-2" />
            <span>Logout</span>
          </button>
          </div>

          <LogOut 
            size={20} 
            className="mr-2 xs:block md:hidden text-red-600 hover:text-red-700 cursor-pointer" 
            onClick={handleLogout}
          />
           </div>
                     
            <div className="flex items-center ml-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full overflow-hidden flex items-center justify-center text-white font-medium">
                {userInitial || '?'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;