import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle, User, Activity, ToggleLeft, ToggleRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Find the doctor record for this user
      const doctorsRes = await api.get('/doctors');
      const currentDoctor = doctorsRes.data.find(d => d.user?.email === user.email || d.user?.id === user.id);
      
      if (currentDoctor) {
        setDoctorInfo(currentDoctor);
        setIsAvailable(currentDoctor.available);
        
        // Fetch appointments for this doctor (Assuming an API exists for doctor's own appointments)
        // If not, we might need a generic GET /api/appointments and filter
        const appointmentsRes = await api.get('/appointments/all'); // Placeholder, adjust based on actual API
        const doctorAppointments = appointmentsRes.data.filter(app => app.doctor?.id === currentDoctor.id);
        setAppointments(doctorAppointments);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      const newStatus = !isAvailable;
      await api.put(`/doctors/${doctorInfo.id}/availability?available=${newStatus}`);
      setIsAvailable(newStatus);
      toast.success(`You are now ${newStatus ? 'Available' : 'Unavailable'}`);
    } catch (error) {
      toast.error('Failed to update availability');
    }
  };

  if (loading) return <div className="h-full flex items-center justify-center"><Loader size="lg" /></div>;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl text-white shadow-xl shadow-primary-200 dark:shadow-none">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl font-bold border border-white/30">
            {user?.name?.[0] || 'D'}
          </div>
          <div>
            <h1 className="text-3xl font-bold leading-tight">Dr. {user?.name || 'Doctor'}</h1>
            <p className="text-primary-100 mt-1 opacity-90">{doctorInfo?.specialization} Specialist</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
          <div className="text-right">
            <p className="text-xs font-bold uppercase tracking-wider opacity-80">Availability Status</p>
            <p className="font-bold text-lg">{isAvailable ? 'Available' : 'On Break'}</p>
          </div>
          <button 
            onClick={handleToggleAvailability}
            className={`p-2 rounded-xl transition-all ${isAvailable ? 'text-green-400' : 'text-gray-300'}`}
          >
            {isAvailable ? <ToggleRight size={44} /> : <ToggleLeft size={44} />}
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-xl">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Today's Visits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-xl">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{appointments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Scheduled Appointments</h3>
          <button className="text-primary-600 text-sm font-bold hover:underline">View All</button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700 font-medium">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">No appointments scheduled yet.</td>
                </tr>
              ) : (
                appointments.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                          <User size={18} />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-white">Patient #{app.patientId || 'N/A'}</p>
                          <p className="text-xs text-gray-500">Regular Checkup</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">{app.date}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 text-sm">10:00 AM</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-tighter">
                        Confirmed
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors" title="Complete">
                          <CheckCircle size={20} />
                        </button>
                        <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Cancel">
                          <XCircle size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
