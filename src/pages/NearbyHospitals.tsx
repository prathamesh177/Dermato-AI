import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, Globe, ExternalLink, Filter } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance?: number;
  type: string;
  specialties: string[];
}

const NearbyHospitals: React.FC = () => {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNearbyHospitals = async (latitude: number, longitude: number) => {
    try {
      // Create Overpass query for all healthcare facilities within 10km
      const radius = 10000; // 10km in meters
      const query = `
        [out:json][timeout:25];
        (
          // Find hospitals
          way(around:${radius},${latitude},${longitude})["amenity"="hospital"];
          node(around:${radius},${latitude},${longitude})["amenity"="hospital"];
          // Find clinics
          way(around:${radius},${latitude},${longitude})["amenity"="clinic"];
          node(around:${radius},${latitude},${longitude})["amenity"="clinic"];
          // Find medical centers
          way(around:${radius},${latitude},${longitude})["amenity"="doctors"];
          node(around:${radius},${latitude},${longitude})["amenity"="doctors"];
          // Find medical offices
          way(around:${radius},${latitude},${longitude})["healthcare"="doctor"];
          node(around:${radius},${latitude},${longitude})["healthcare"="doctor"];
        );
        out body;
        >;
        out skel qt;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }

      const data = await response.json();
      
      // Process and filter the results
      const processedHospitals = data.elements
        .filter((place: any) => place.tags && place.tags.name)
        .map((place: any) => {
          const lat = place.lat || (place.center && place.center.lat);
          const lon = place.lon || (place.center && place.center.lon);
          
          if (!lat || !lon) return null;

          const distance = calculateDistance(
            latitude,
            longitude,
            lat,
            lon
          );

          // Determine facility type and specialties
          let type = 'Healthcare Facility';
          let specialties = ['General Medicine'];

          if (place.tags.amenity === 'hospital') {
            type = 'Hospital';
          } else if (place.tags.amenity === 'clinic') {
            type = 'Clinic';
          } else if (place.tags.healthcare === 'doctor') {
            type = 'Medical Office';
          }

          // Check for dermatology specialty
          if (place.tags['healthcare:speciality'] === 'dermatology' ||
              (place.tags.description && place.tags.description.toLowerCase().includes('dermatology')) ||
              (place.tags.name && place.tags.name.toLowerCase().includes('dermatology')) ||
              (place.tags.name && place.tags.name.toLowerCase().includes('skin'))) {
            specialties = ['Dermatology'];
          }

          return {
            id: place.id.toString(),
            name: place.tags.name,
            address: [
              place.tags['addr:street'],
              place.tags['addr:housenumber'],
              place.tags['addr:city'],
              place.tags['addr:postcode']
            ].filter(Boolean).join(', ') || 'Address not available',
            latitude: lat,
            longitude: lon,
            distance: distance,
            type: type,
            specialties: specialties
          };
        })
        .filter((hospital: Hospital | null): hospital is Hospital => hospital !== null)
        .sort((a: Hospital, b: Hospital) => (a.distance ?? Infinity) - (b.distance ?? Infinity));

      setHospitals(processedHospitals);

      if (processedHospitals.length === 0) {
        setError('No healthcare facilities found in your area. Try a different location.');
      }
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('Failed to fetch nearby hospitals. Please try again later.');
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  };

  const getUserLocation = () => {
    setLoading(true);
    setError(null);
    setHospitals([]);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser. Please try using a different browser or device.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setUserLocation(position);
        await fetchNearbyHospitals(
          position.coords.latitude,
          position.coords.longitude
        );
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please enable location services in your browser settings and grant permission to access your location.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable. Please check your internet connection and try again.';
            break;
          case error.TIMEOUT:
            errorMessage += 'The request to get your location timed out. Please try again.';
            break;
          default:
            errorMessage += 'An unknown error occurred. Please try again later.';
        }
        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const openInMaps = (hospital: Hospital) => {
    const url = `https://www.openstreetmap.org/?mlat=${hospital.latitude}&mlon=${hospital.longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Nearby Hospitals</h1>
          <p className="text-gray-600 mb-6">
            Find hospitals and healthcare facilities within 10km of your location.
          </p>
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            <Navigation className="w-5 h-5 mr-2" />
            {loading ? 'Finding Hospitals...' : 'Find Hospitals Near Me'}
          </button>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid gap-6">
          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {hospital.name}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{hospital.address}</span>
                  </div>
                  <div className="mb-2">
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className={`text-sm px-2 py-1 rounded ${
                            specialty === 'Dermatology'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {specialty}
                        </span>
                      ))}
                      <span className="text-sm px-2 py-1 rounded bg-gray-50 text-gray-700">
                        {hospital.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end mt-4 md:mt-0 md:ml-6">
                  <span className="text-sm font-medium text-gray-500 mb-2">
                    {hospital.distance?.toFixed(1)} km away
                  </span>
                  <button
                    onClick={() => openInMaps(hospital)}
                    className="flex items-center text-blue-600 hover:text-blue-700"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Open in Maps
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hospitals.length === 0 && !loading && !error && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Click the button above to find hospitals near your location
            </p>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-700">
            <strong>Note:</strong> Always verify hospital information and availability before visiting. Some locations may require appointments for consultations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NearbyHospitals;