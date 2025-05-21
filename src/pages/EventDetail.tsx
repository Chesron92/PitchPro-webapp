import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';

interface EventData {
  id: string;
  title: string;
  date: Timestamp;
  eventType: string;
  locationType?: string;
  locationDetails?: string;
  recruiterEmail?: string;
  jobSeekerEmail?: string;
}

const EventDetail: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;
      try {
        const ref = doc(db, 'events', eventId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setEvent({ id: snap.id, ...(snap.data() as any) });
        }
      } catch (err) {
        console.error('Fout bij ophalen event detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        <div className="ml-4">Event laden...</div>
      </div>
    );
  }

  if (!event) {
    return <p className="p-8 text-center text-gray-500">Event niet gevonden.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="text-primary-600 hover:underline mb-4">← Terug</button>
      <div className="bg-white shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
        <p className="text-gray-700 mb-1">Datum: {format(event.date.toDate(),'dd MMMM yyyy HH:mm')}</p>
        <p className="text-gray-700 mb-1">Type: {event.eventType}</p>
        {event.locationType && <p className="text-gray-700 mb-1">Locatie: {event.locationType} - {event.locationDetails}</p>}
        {event.recruiterEmail && <p className="text-gray-700 mb-1">Recruiter: {event.recruiterEmail}</p>}
        {event.jobSeekerEmail && <p className="text-gray-700 mb-1">Kandidaat: {event.jobSeekerEmail}</p>}
      </div>
    </div>
  );
};

export default EventDetail; 