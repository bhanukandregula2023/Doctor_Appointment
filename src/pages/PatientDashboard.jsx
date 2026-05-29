import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Search, Calendar, User, Clock, Filter, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('All');
  const [bookingDate, setBookingDate] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        api.get('/doctors'),
        api.get(`/appointments/patient/${user.id || 1}`) // Backend requires patientId, using 1 as fallback
      ]);
      setDoctors(doctorsRes.data);
      setAppointments(appointmentsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!bookingDate) {
      toast.error('Please select a date');
      return;
    }
    
    try {
      await api.post(`/appointments?patientId=${user.id || 1}&doctorId=${selectedDoctorId}&date=${bookingDate}`);
      toast.success('Appointment booked successfully!');
      setIsBookingModalOpen(false);
      fetchData(); // Refresh appointments
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    }
  };

  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      await api.delete(`/appointments/${id}`);
      toast.success('Appointment cancelled');
      fetchData();
    } catch (error) {
      toast.error('Failed to cancel appointment');
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterSpecialization === 'All' || doctor.specialization === filterSpecialization;
    return matchesSearch && matchesFilter;
  });

  const specializations = ['All', ...new Set(doctors.map(d => d.specialization))];

  if (loading) return <div className="h-full flex items-center justify-center"><Loader size="lg" /></div>;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight">Patient Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, {user?.name || 'Patient'}! Manage your health appointments here.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 dark:shadow-none">
            Emergency Care
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: My Appointments */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <Calendar className="mr-2 text-primary-600" size={20} />
              My Appointments
            </h3>
            <span className="bg-primary-100 text-primary-600 text-xs font-bold px-2.5 py-1 rounded-full">{appointments.length} Total</span>
          </div>
          
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {appointments.length === 0 ? (
              <div className="text-center p-8 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
                <p className="text-gray-500 text-sm italic">No upcoming appointments</p>
              </div>
            ) : (
              appointments.map(app => (
                <div key={app.id} className="bg-gray-50 dark:bg-slate-700/50 p-4 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all hover:shadow-md group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Dr. {app.doctor?.user?.name}</h4>
                      <p className="text-xs text-primary-600 font-medium">{app.doctor?.specialization}</p>
                    </div>
                    <button 
                      onClick={() => handleCancelAppointment(app.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center"><Calendar size={14} className="mr-1" /> {app.date}</div>
                    <div className="flex items-center"><Clock size={14} className="mr-1" /> 10:00 AM</div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                      app.date >= new Date().toISOString().split('T')[0] 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-400'
                    }`}>
                      {app.date >= new Date().toISOString().split('T')[0] ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Find Doctors */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <User size={20} className="mr-2 text-primary-600" />
              Available Specialists
            </h3>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search doctors..." 
                  className="pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 w-full sm:w-48"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <select 
                  className="pl-3 pr-8 py-2 text-sm bg-gray-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 appearance-none"
                  value={filterSpecialization}
                  onChange={(e) => setFilterSpecialization(e.target.value)}
                >
                  {specializations.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.length === 0 ? (
              <div className="col-span-2 text-center p-12 bg-gray-50 dark:bg-slate-700/30 rounded-3xl">
                <p className="text-gray-500">No doctors found matching your criteria.</p>
              </div>
            ) : (
              filteredDoctors.map(doctor => (
                <div key={doctor.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 hover:border-primary-200 dark:hover:border-primary-900 transition-all shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center text-primary-600 text-xl font-bold">
                      {doctor.user?.name?.[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">Dr. {doctor.user?.name}</h4>
                      <p className="text-sm text-primary-600 font-medium">{doctor.specialization}</p>
                      <div className="flex items-center text-xs text-green-500 font-medium mt-1">
                        <CheckCircle2 size={12} className="mr-1" />
                        Available Now
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button 
                      onClick={() => {
                        setSelectedDoctorId(doctor.id);
                        setIsBookingModalOpen(true);
                      }}
                      className="flex-1 py-2 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                      Book Visit
                    </button>
                    <button className="px-3 py-2 bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-xl hover:bg-gray-100 transition-colors">
                      Profile
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-800 w-full max-w-md p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Book Appointment</h2>
            <p className="text-gray-500 text-sm mb-6">Select a date for your consultation with Dr. {doctors.find(d => d.id === selectedDoctorId)?.user?.name}</p>
            
            <form onSubmit={handleBookAppointment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Consultation Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-700 border-none rounded-xl focus:ring-2 focus:ring-primary-500 dark:text-white"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-2">
                <button 
                  type="button"
                  onClick={() => setIsBookingModalOpen(false)}
                  className="flex-1 py-3 text-gray-600 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 dark:shadow-none"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
