import React, { useState } from 'react';
import { Plane, Calculator, Info } from 'lucide-react';
import airports from './airports.json';

const aircraftTypes = [
    { name: 'Airbus A220-100', emission: 0.85 },
    { name: 'Airbus A220-300', emission: 0.82 },
    { name: 'Airbus A319', emission: 1.06 },
    { name: 'Airbus A320', emission: 1.03 },
    { name: 'Airbus A321', emission: 0.96 },
    { name: 'Airbus A330-200', emission: 1.10 },
    { name: 'Airbus A330-300', emission: 1.04 },
    { name: 'Airbus A330-900neo', emission: 0.85 },
    { name: 'Airbus A350-900', emission: 0.85 },
    { name: 'Airbus A350-1000', emission: 0.82 },
    { name: 'Airbus A380', emission: 0.95 },
    { name: 'Boeing 737-700', emission: 1.08 },
    { name: 'Boeing 737-800', emission: 1.05 },
    { name: 'Boeing 737-900', emission: 1.02 },
    { name: 'Boeing 737 MAX 8', emission: 0.93 },
    { name: 'Boeing 737 MAX 9', emission: 0.90 },
    { name: 'Boeing 737 MAX 10', emission: 0.88 },
    { name: 'Boeing 747-400', emission: 1.15 },
    { name: 'Boeing 747-8', emission: 1.05 },
    { name: 'Boeing 757-200', emission: 1.10 },
    { name: 'Boeing 757-300', emission: 1.05 },
    { name: 'Boeing 767-300ER', emission: 1.08 },
    { name: 'Boeing 767-400ER', emission: 1.05 },
    { name: 'Boeing 777-200ER', emission: 1.04 },
    { name: 'Boeing 777-200LR', emission: 1.01 },
    { name: 'Boeing 777-300ER', emission: 0.99 },
    { name: 'Boeing 787-8', emission: 0.88 },
    { name: 'Boeing 787-9', emission: 0.85 },
    { name: 'Boeing 787-10', emission: 0.82 },
    { name: 'Embraer E175', emission: 1.25 },
    { name: 'Embraer E190', emission: 1.20 },
    { name: 'Embraer E195', emission: 1.15 },
    { name: 'Bombardier CRJ700', emission: 1.30 },
    { name: 'Bombardier CRJ900', emission: 1.25 },
    { name: 'Bombardier CRJ1000', emission: 1.20 },
    { name: 'Bombardier Q400', emission: 1.35 },
    { name: 'ATR 42-500', emission: 1.40 },
    { name: 'ATR 72-500', emission: 1.35 },
    { name: 'Sukhoi Superjet 100', emission: 1.20 },
    { name: 'Comac ARJ21', emission: 1.25 },
    { name: 'Irkut MC-21', emission: 0.85 },
    { name: 'Mitsubishi SpaceJet M90', emission: 1.15 },
  ];

function CarbonCalculator() {
  const [flightData, setFlightData] = useState({
    origin: '',
    destination: '',
    passengers: 1,
    class: 'economy',
    aircraft: aircraftTypes[0].name,
  });
  const [result, setResult] = useState(null);

  // Emission factors (kg CO2 per passenger per km)
  const emissionFactors = {
    economy: 0.115,
    business: 0.230,
    firstClass: 0.345,
  };

  const calculateDistance = (origin, destination) => {
    const originAirport = airports.find((a) => a.iata === origin);
    const destAirport = airports.find((a) => a.iata === destination);

    if (!originAirport || !destAirport) {
      return null;
    }

    const R = 6371; // earth radius in km
    const dLat = toRad(destAirport.lat - originAirport.lat);
    const dLon = toRad(destAirport.lng - originAirport.lng);
    const lat1 = toRad(originAirport.lat);
    const lat2 = toRad(destAirport.lat);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const calculateEmissions = (e) => {
    e.preventDefault();

    const distance = calculateDistance(flightData.origin, flightData.destination);
    if (!distance) {
      alert('Please select valid airports');
      return;
    }

    const aircraftFactor = aircraftTypes.find((a) => a.name === flightData.aircraft).emission;
    const baseCO2 = distance * emissionFactors[flightData.class] * aircraftFactor;
    const totalCO2 = baseCO2 * 2; // Assuming round trip
    const perPersonCO2 = totalCO2 / flightData.passengers;

    setResult({
      perPerson: Math.round(perPersonCO2 * 100) / 100,
      total: Math.round(totalCO2 * 100) / 100,
    });
  };

  const getEmissionLevel = (emissions) => {
    if (emissions <= 1500) return 'from-green-100 to-green-200';
    if (emissions <= 2500) return 'from-yellow-100 to-yellow-200';
    if (emissions <= 3500) return 'from-orange-100 to-orange-200';
    return 'from-red-100 to-red-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 mb-4">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Flight Carbon Calculator</h2>
          <p className="mt-2 text-gray-600">Calculate your flight's carbon footprint</p>
        </div>

        <form onSubmit={calculateEmissions} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Origin Airport</label>
            <select
              value={flightData.origin}
              onChange={(e) => setFlightData({ ...flightData, origin: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
            >
              <option value="">Select origin airport</option>
              {airports.map((airport) => (
                <option key={airport.iata} value={airport.iata}>
                  {airport.city} ({airport.iata})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Destination Airport</label>
            <select
              value={flightData.destination}
              onChange={(e) => setFlightData({ ...flightData, destination: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
            >
              <option value="">Select destination airport</option>
              {airports.map((airport) => (
                <option key={airport.iata} value={airport.iata}>
                  {airport.city} ({airport.iata})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Aircraft Type</label>
            <select
              value={flightData.aircraft}
              onChange={(e) => setFlightData({ ...flightData, aircraft: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
            >
              {aircraftTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Number of Passengers</label>
            <input
              type="number"
              required
              min="1"
              value={flightData.passengers}
              onChange={(e) => setFlightData({ ...flightData, passengers: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Cabin Class</label>
            <div className="mt-2 flex">
              <div
                className={`py-2 px-4 rounded-l-md border ${
                  flightData.class === 'economy' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                } cursor-pointer`}
                onClick={() => setFlightData({ ...flightData, class: 'economy' })}
              >
                Economy
              </div>
              <div
                className={`py-2 px-4 border-t border-b ${
                  flightData.class === 'business' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                } cursor-pointer`}
                onClick={() => setFlightData({ ...flightData, class: 'business' })}
              >
                Business
              </div>
              <div
                className={`py-2 px-4 rounded-r-md border ${
                  flightData.class === 'firstClass' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                } cursor-pointer`}
                onClick={() => setFlightData({ ...flightData, class: 'firstClass' })}
              >
                First
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-md shadow-md text-white text-lg uppercase tracking-wider font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Emissions
          </button>
        </form>

        {result && (
          <div className={`mt-8 p-6 rounded-xl bg-gradient-to-r ${getEmissionLevel(result.total)}`}>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Results</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600 font-medium">Per Person:</p>
                <p className="text-gray-800 font-semibold text-xl">{result.perPerson} kg CO2</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600 font-medium">Total:</p>
                <p className="text-gray-800 font-semibold text-xl">{result.total} kg CO2</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-200 flex items-start">
              <Info className="w-6 h-6 text-blue-500 mr-4" />
              <p className="text-sm text-gray-700">
                This is equivalent to driving a car for approximately{' '}
                <span className="font-semibold text-gray-800">{Math.round(result.total / 0.2)} km</span>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonCalculator;