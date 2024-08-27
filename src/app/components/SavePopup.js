import { useState } from 'react';

export default function SavePopup({ message, setShowPopup }) {
  const [messageName, setMessageName] = useState('');
  const [category, setCategory] = useState('');

  /*   const handleSave = async (e) => {
    e.preventDefault();

    // Aquí se envían los datos al backend (puedes usar una API de Next.js)
   const response = await fetch('/api/save-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageName,
        category,
        messageContent: message,
      }),
    });

    const data = await response.json();

    if (data.success) {
      closePopup();
    }
  };
 */
  console.log(message);
  const closePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>
      <div className="popup-overlay" onClick={closePopup}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <h2>Save Chat Message</h2>
          <form>
            <label htmlFor="messageName">Message Name:</label>
            <input
              type="text"
              id="messageName"
              value={messageName}
              onChange={(e) => setMessageName(e.target.value)}
              required
            />

            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Fitness">Fitness</option>
              <option value="Health">Health</option>
              <option value="Nutrition">Nutrition</option>
            </select>

            <button type="submit">Save</button>
          </form>
          <button className="close-btn" onClick={closePopup}>
            Close
          </button>
        </div>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        .popup {
          position: fixed;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border: 2px solid black;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .close-btn {
          margin-top: 10px;
          padding: 5px 10px;
          background-color: red;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
