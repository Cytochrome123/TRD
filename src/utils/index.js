import jwtDecode from 'jwt-decode';

export const isTokenExpiredv1 = (token) => {
    try {
        // Decode the token to get its payload
        const decoded = jwtDecode(token);

        // Get current time in seconds since the Unix epoch
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        // Check if the exp claim exists and compare it with the current time
        if (decoded.exp && decoded.exp < currentTimeInSeconds) {
            return true; // Token is expired
        }

        return false; // Token is not expired
    } catch (error) {
        console.error("Error decoding token:", error);
        return true; // Consider the token expired if there's an error decoding it
    }
}

export const isTokenExpiredv2 = (token) => {
    // Split the token into parts and decode the payload
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload); // Use Base64 decoding
    const payloadObj = JSON.parse(decodedPayload);

    // Get current time in seconds since the Unix epoch
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);

    // Check if the exp claim exists and compare it with the current time
    if (payloadObj.exp && payloadObj.exp < currentTimeInSeconds) {
        return true; // Token is expired
    }

    return false; // Token is not expired
}

export function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}