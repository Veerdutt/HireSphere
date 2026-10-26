/**
 * Validates email addresses and blocks known invalid domains or common typos like mail.com and gamil.com
 */
export const validateEmail = (emailStr) => {
  if (!emailStr || !emailStr.trim()) {
    return {
      isValid: false,
      error: 'Please enter your email address.',
    };
  }

  const trimmed = emailStr.trim();

  // Standard RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please provide a valid email address (e.g., name@gmail.com or student@university.edu).',
    };
  }

  const domain = trimmed.split('@')[1]?.toLowerCase();

  // Specifically disallow generic '@mail.com' and guide towards '@gmail.com'
  if (domain === 'mail.com') {
    return {
      isValid: false,
      error: 'The domain "@mail.com" is not accepted. Did you mean @gmail.com?',
    };
  }

  // Common typos of gmail.com
  const typoGmailDomains = [
    'gamil.com',
    'gmial.com',
    'gmai.com',
    'gmaill.com',
    'gmil.com',
    'email.com',
    'gmail.co',
    'gmail.cm',
    'gmaild.com',
  ];

  if (typoGmailDomains.includes(domain)) {
    return {
      isValid: false,
      error: `Invalid domain "@${domain}". Did you mean @gmail.com?`,
    };
  }

  return { isValid: true, error: '' };
};
