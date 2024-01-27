import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";

import "./styles.css";

const Profile = () => {
    const { user, token } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [userProfile, setUserProfile] = useState(user);

    return (
        <div>
            <EditProfileForm
                user={userProfile}
                isEditing={isEditing}
                token={token}
                editProfile={(value) => {
                    console.log("value moi chinh : ", value);
                    setUserProfile(value);
                }}
                toggleEdit={(value) => setIsEditing(value)}
            />
        </div>
    );
};

export default Profile;
