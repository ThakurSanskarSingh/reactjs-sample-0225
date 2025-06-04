import React from 'react';
import { ProfileModalProps } from '../lib/types';
import Image from 'next/image';


const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Profile</h2>
          
          <div className="text-center mb-6">
          <Image
  src={user.avatar}
  alt="Profile"
  width={80}
  height={80}
  className="rounded-full mx-auto mb-4"
/>
            <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
            {user.walletAddress && (
              <p className="text-sm text-gray-600 mt-2">
                Wallet: {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
              </p>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Member since</span>
              <span className="text-gray-900">June 2025</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Tasks completed</span>
              <span className="text-gray-900">12</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">Total tasks created</span>
              <span className="text-gray-900">28</span>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;