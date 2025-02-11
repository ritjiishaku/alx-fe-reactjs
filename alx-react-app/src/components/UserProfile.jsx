// src/components/UserProfile.jsx
const UserProfile = ({ name, age, bio }) => {
  return (
    <div className="profile-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p><strong>Bio:</strong> {bio}</p>
    </div>
  );
};

export default UserProfile;
