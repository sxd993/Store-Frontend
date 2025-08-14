export const formatPhone = (rawValue) => {
    const digitsOnly = String(rawValue || '').replace(/\D/g, '');
    let normalized = digitsOnly;
    if (normalized.startsWith('8')) normalized = '7' + normalized.slice(1);
    if (normalized.startsWith('7')) normalized = normalized.slice(1);
    const rest = normalized.slice(0, 10);

    let result = '+7';
    if (rest.length > 0) result += ' (' + rest.slice(0, 3);
    if (rest.length >= 3) result += ') ' + rest.slice(3, 6);
    if (rest.length >= 6) result += '-' + rest.slice(6, 8);
    if (rest.length >= 8) result += '-' + rest.slice(8, 10);
    return result;
};

export const normalizePhone = (formatted) => {
    const digits = String(formatted || '').replace(/\D/g, '');
    if (!digits) return '';
    if (digits.length < 11) return '';
    return '+7' + digits.slice(-10);
};
