// utils.js

// Helper function to truncate email
export const truncateEmail = (email) => {
  if (email && typeof email === "string") {
    const atIndex = email.indexOf("@");
    if (atIndex > 0) {
      return email.substring(0, atIndex);
    }
  }
  return email;
};
