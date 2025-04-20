import React from 'react';
import { History as HistoryIcon, Calendar, Tag } from 'lucide-react';

const History = () => {
  const mockHistory = [
    {
      id: 1,
      date: '2024-03-15',
      prediction: 'Acne',
      confidence: '95%',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-03-14',
      prediction: 'Eczema',
      confidence: '87%',
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024-03-13',
      prediction: 'Psoriasis',
      confidence: '92%',
      status: 'Completed'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <HistoryIcon className="w-12 h-12 text-blue-600 mr-4" />
          <h1 className="text-3xl font-bold text-gray-900">Analysis History</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">Your recent skin analysis history</p>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Export History
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prediction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockHistory.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{item.date}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{item.prediction}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{item.confidence}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-700 font-medium mr-3">
                          View
                        </button>
                        <button className="text-red-600 hover:text-red-700 font-medium">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {mockHistory.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;