// utils.js

export function formatCleverTapDOB(unixTimestamp) {
    const dob = new Date(unixTimestamp); // Convert Unix timestamp to JavaScript Date object
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(dob.getDate()).padStart(2, '0');
  
    // Format the DOB as per CleverTap's requirement: "$D_YYYYMMDD"
    return `$D_${year}${month}${day}`;
  }

  
  