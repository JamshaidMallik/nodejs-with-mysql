export const getPostImageUrl = (filename, folder = 'post-images') => {
    const baseUrl = import.meta.env.VITE_BASE_URL.replace('/api', '');
    return `${baseUrl}/uploads/${folder}/${filename}`;
};

export const getProfileImageUrl = (filename, folder = 'profile-images') => {
    const baseUrl = import.meta.env.VITE_BASE_URL.replace('/api', '');
    return `${baseUrl}/uploads/${folder}/${filename}`;
};
