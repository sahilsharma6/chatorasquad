import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Bell, Globe, PencilLine, Check, X, User, Palette, Camera, Save } from 'lucide-react';
import Tab from '../../components/admin/Setting/Tab';
import ProfileTab from '../../components/admin/Setting/ProfileTab';
import AppearanceTab from '../../components/admin/Setting/AppearanceTab';

const AdminSettings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [language, setLanguage] = useState('english');
    const [profilePicture, setProfilePicture] = useState('https://images.unsplash.com/photo-1474176857210-7287d38d27c6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    const fileInputRef = useRef(null);
    const [profile, setProfile] = useState({
        firstName: 'John',
        lastName: "smith",
        email: 'john@restaurant.com',
        age: 24,
        phoneNo: '+91 9234 57 8900',
        gender: "Male"
    });
    const [editedProfile, setEditedProfile] = useState(profile);
    const [hasChanges, setHasChanges] = useState(false);

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
        setHasChanges(false);
    };

    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicture(e.target.result);
                setHasChanges(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (key, value) => {
        setEditedProfile(prev => ({
            ...prev,
            [key]: value
        }));
        setHasChanges(true);
    };

    const tabVariants = {
        inactive: { opacity: 0.6 },
        active: { opacity: 1 }
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const tabs = [
        { id: 'profile', icon: User, label: 'Profile' },
        { id: 'appearance', icon: Palette, label: 'Appearance' }
    ];

    return (
        <div className="min-h-screen  bg-amber-50 p-6">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg p-6">
                <h1 className="text-3xl text-center font-bold text-orange-600 mb-8">Settings</h1>

                {/* Tabs */}
                <Tab tabVariants={tabVariants} tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Profile Tab Content */}
                <ProfileTab activeTab={activeTab} profile={profile} setEditedProfile={setEditedProfile} hasChanges={hasChanges} setHasChanges={setHasChanges} setIsEditing={setIsEditing} isEditing={isEditing} contentVariants={contentVariants} handleInputChange={handleInputChange} handleProfilePictureChange={handleProfilePictureChange} handleSave={handleSave} fileInputRef={fileInputRef} editedProfile={editedProfile} profilePicture={profilePicture}  />

                {/* Appearance Tab Content */}
               <AppearanceTab setIsDarkMode={setIsDarkMode} setLanguage={setLanguage} setNotifications={setNotifications} language={language} notifications={notifications} activeTab={activeTab} contentVariants={contentVariants} isDarkMode={isDarkMode} />
            </div>
        </div>
    );
};

export default AdminSettings;