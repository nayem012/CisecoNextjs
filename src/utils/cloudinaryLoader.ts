// utils/imageLoader.ts
export const cloudinaryLoader = ({
    src,
    width,
    quality
}: {
    src: string;
    width: number;
    quality?: number;
}) => {
    // If image is from Cloudinary
    if (src.includes('res.cloudinary.com')) {
        const params = [
            'f_auto',
            'q_auto:best',
            `w_${width}`,
            ...(quality ? [`q_${quality}`] : [])
        ];
        return src.replace('/upload/', `/upload/${params.join(',')}/`);
    }

    // For non-Cloudinary images, return unoptimized URL
    return src;
};