import React, { useState, useEffect } from 'react';
import { CommunityEvent } from '../types';
import { Calendar, MapPin, Users, CheckCircle, Video, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface EventsPageProps {
  onNavigate: (path: string) => void;
}

export const EventsAnnouncementsPage: React.FC<EventsPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [events, setEvents] = useState<(CommunityEvent & { is_registered?: boolean })[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/community/events');
      if (res.ok) {
        const d = await res.json();
        setEvents(d.events || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleRegister = async (eventId: string) => {
    if (!user) {
      onNavigate('/login');
      return;
    }

    try {
      const res = await fetch(`/api/community/events/${eventId}/register`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Confirmation details recorded.');
        fetchEvents();
      } else {
        setMessage(data.error || 'Failed to register.');
      }
    } catch {
      setMessage('Network error during event registration.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d4af37] font-royal-heading">
          <Calendar className="w-4 h-4" />
          <span>Gatherings, Symposiums & Heritage Tours</span>
        </div>
        <h1 className="font-royal-heading font-extrabold text-2xl sm:text-4xl text-[#fcedc7]">
          Events & Community Announcements
        </h1>
        <p className="text-xs sm:text-sm text-stone-400 max-w-3xl leading-relaxed">
          Stay connected with our global research seminars, on-site archaeological explorations, and annual cultural celebrations.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-900 text-xs sm:text-sm text-emerald-300">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {events.map(ev => {
          const isFull = ev.registered_count >= ev.max_attendees;
          return (
            <div
              key={ev.id}
              className="p-6 sm:p-8 rounded-3xl bg-[#121622] border border-stone-800 space-y-4 shadow-xl hover:border-[#c99738]/50 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#d4af37] px-3 py-1 rounded-full bg-stone-900 border border-stone-800">
                    {ev.event_type}
                  </span>
                  {ev.is_virtual && (
                    <span className="text-xs text-sky-400 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-950/60 border border-sky-800">
                      <Video className="w-3 h-3" /> Virtual Stream
                    </span>
                  )}
                </div>

                <div className="text-xs text-stone-400 flex items-center gap-4">
                  <span>Capacity: {ev.registered_count} / {ev.max_attendees} Registered</span>
                </div>
              </div>

              <div>
                <h3 className="font-royal-heading font-bold text-lg sm:text-xl text-stone-100">
                  {ev.title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#e8c872] mt-1.5 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {ev.date_text}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {ev.location}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-royal-serif">
                {ev.description}
              </p>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                {ev.is_registered ? (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/60">
                    <CheckCircle className="w-4 h-4" /> You are registered for this event
                  </span>
                ) : isFull ? (
                  <span className="text-xs text-rose-400 font-semibold">
                    Registration Closed (Capacity Reached)
                  </span>
                ) : (
                  <button
                    onClick={() => handleRegister(ev.id)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-[#c99738] text-[#300207] hover:bg-[#dfab43] transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Register to Attend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
