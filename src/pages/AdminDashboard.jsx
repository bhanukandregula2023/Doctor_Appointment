import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  Plus, 
  Search, 
  MoreVertical, 
  Shield, 
  Trash2, 
  Edit2, 
  X,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const AdminDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddDoctorModalOpen, setIsAddDoctorModalOpen] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    userId: '',
    specialization: '',
    available: true
  });
  const [users, setUsers] = useState([]); // To select from existing users if needed

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        api.get('/doctors'),
        api.get('/appointments/all') // Adjust based on actual API
      ]);
      setDoctors(doctorsRes.data);
      setAppointments(appointmentsRes.data);
      
      // In a real app, we'd also fetch users who are not yet doctors
      // For demo, we'll just mock it or skip it
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load system data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctors', {
        specialization: newDoctor.specialization,
        available: newDoctor.available,
        user: { id: parseInt(newDoctor.userId) }
      });
      toast.success('Doctor added successfully');
      setIsAddDoctorModalOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Failed to add doctor');
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader size="lg" /></div>;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">System control panel. Manage doctors and monitor all appointments.</p>
        </div>
        <button 
          onClick={() => setIsAddDoctorModalOpen(true)}
          className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none"
        >
          <Plus size={20} className="mr-2" />
          Add New Doctor
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Doctors', count: doctors.length, icon: Stethoscope, color: 'blue' },
          { label: 'Total Patients', count: 124, icon: Users, color: 'purple' },
          { label: 'Total Appointments', count: appointments.length, icon: Calendar, color: 'green' },
          { label: 'Admins', count: 2, icon: Shield, color: 'red' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className={`p-3 w-fit rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.count}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Doctors Management */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-50 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-white">Manage Doctors</h3>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 text-xs bg-gray-50 dark:bg-slate-700 border-none rounded-lg focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 dark:bg-slate-700/30">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Doctor</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Specialization</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-slate-700">
                {doctors.map(doctor => (
                  <tr key={doctor.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-50 dark:bg-slate-700 rounded-full flex items-center justify-center text-primary-600 font-bold">
                          {doctor.user?.name?.[0]}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-white">Dr. {doctor.user?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded-md text-gray-600 dark:text-gray-400">
                        {doctor.specialization}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1">
                        <button className="p-2 text-gray-400 hover:text-primary-600 rounded-lg transition-colors"><Edit2 size={16} /></button>
                        <button className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Global Recent Appointments */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-50 dark:border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-gray-800 dark:text-white">System Appointments</h3>
            <span className="text-xs font-bold text-primary-600 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded-full">Live Feed</span>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-slate-700">
            {appointments.length === 0 ? (
              <div className="p-10 text-center text-gray-500 italic">No system appointments to show.</div>
            ) : (
              appointments.slice(0, 5).map(app => (
                <div key={app.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Patient #{app.patientId} → Dr. {app.doctor?.user?.name}</p>
                      <p className="text-xs text-gray-500">{app.date} • {app.doctor?.specialization}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold py-1 px-2 rounded-full border border-green-200 text-green-600 dark:border-green-900/30 dark:text-green-500">ACTIVE</span>
                </div>
              ))
            )}
            <button className="w-full py-4 text-xs font-bold text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors uppercase tracking-widest text-center">
              View Detailed Log
            </button>
          </div>
        </div>
      </div>

      {/* Add Doctor Modal */}
      {isAddDoctorModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 relative">
            <button onClick={() => setIsAddDoctorModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Registed New Doctor</h2>
            
            <form onSubmit={handleAddDoctor} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">User ID (Existing User)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="number" 
                    required
                    placeholder="e.g. 2"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 dark:text-white"
                    value={newDoctor.userId}
                    onChange={(e) => setNewDoctor({...newDoctor, userId: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialization</label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Cardiologist"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 dark:text-white"
                    value={newDoctor.specialization}
                    onChange={(e) => setNewDoctor({...newDoctor, specialization: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="available"
                  checked={newDoctor.available}
                  onChange={(e) => setNewDoctor({...newDoctor, available: e.target.checked})}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="available" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Active and Available</label>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 dark:shadow-none"
                >
                  Create Doctor Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
