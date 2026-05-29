import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserRound, 
  Stethoscope, 
  CalendarCheck, 
  Users, 
  Settings,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  
  const adminLinks = [
    { to: '/admin', icon: LayoutDashboard, label: 'Admin Dashboard' },
    { to: '/admin/doctors', icon: Stethoscope, label: 'Manage Doctors' },
    { to: '/admin/appointments', icon: CalendarCheck, label: 'All Appointments' },
  ];

  const doctorLinks = [
    { to: '/doctor', icon: LayoutDashboard, label: 'Doctor Dashboard' },
    { to: '/doctor/appointments', icon: CalendarCheck, label: 'My Appointments' },
  ];

  const patientLinks = [
    { to: '/patient', icon: LayoutDashboard, label: 'Patient Dashboard' },
    { to: '/patient/book', icon: Stethoscope, label: 'Find Doctors' },
    { to: '/patient/appointments', icon: CalendarCheck, label: 'My Appointments' },
  ];

  const commonLinks = [
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'ADMIN': return adminLinks;
      case 'DOCTOR': return doctorLinks;
      case 'PATIENT': return patientLinks;
      default: return [];
    }
  };

  const links = getLinks();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen pt-20 transition-all duration-300 bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-slate-800">
        <ul className="space-y-2 font-medium">
          <p className={`px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
            Menu
          </p>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-700'
                  }`
                }
              >
                <link.icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    isOpen ? 'mr-3' : 'mx-auto'
                  }`}
                />
                <span className={`${!isOpen && 'hidden'} transition-opacity duration-300`}>
                  {link.label}
                </span>
                {!isOpen && (
                  <div className="absolute left-20 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {link.label}
                  </div>
                )}
              </NavLink>
            </li>
          ))}
          
          <div className="my-4 border-t border-gray-100 dark:border-slate-700 mx-2" />
          
          <p className={`px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider ${!isOpen && 'hidden'}`}>
            Support
          </p>
          {commonLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-700'
                  }`
                }
              >
                <link.icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    isOpen ? 'mr-3' : 'mx-auto'
                  }`}
                />
                <span className={`${!isOpen && 'hidden'}`}>
                  {link.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        <div className={`mt-auto pt-6 px-4 ${!isOpen && 'hidden'}`}>
          <div className="p-4 bg-primary-600 rounded-2xl text-white shadow-lg shadow-primary-200 dark:shadow-none">
            <h4 className="font-bold text-sm">Need Help?</h4>
            <p className="text-xs text-primary-100 mt-1 opacity-80">Check our documentation or contact support.</p>
            <button className="mt-3 px-3 py-1.5 bg-white text-primary-600 text-xs font-bold rounded-lg hover:bg-primary-50 transition-colors">
              Support Center
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
