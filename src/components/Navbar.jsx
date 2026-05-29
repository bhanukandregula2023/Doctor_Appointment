import React from 'react';
import { Menu, Moon, Sun, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ toggleSidebar, toggleTheme, theme }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 mr-4 text-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-gray-400 focus:outline-none"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary-200 dark:shadow-none">
                H
              </div>
              <span className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
                Hospital<span className="text-primary-600">Sync</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-700">
              <Bell size={20} />
            </button>

            <div className="flex items-center ml-3 space-x-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {user?.name || user?.email?.split('@')[0]}
                </span>
                <span className="text-xs text-primary-600 font-medium">
                  {user?.role}
                </span>
              </div>
              <div className="relative group">
                <button className="flex text-sm bg-primary-100 rounded-full focus:ring-4 focus:ring-primary-300 dark:focus:ring-gray-600">
                  <span className="sr-only">Open user menu</span>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary-700 font-bold bg-primary-200 dark:bg-slate-700 dark:text-primary-400">
                    <User size={20} />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 py-1 hidden group-hover:block transition-all duration-300">
                  <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700 md:hidden">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{user?.name || user?.email?.split('@')[0]}</p>
                    <p className="text-xs font-medium text-primary-600">{user?.role}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
