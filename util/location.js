const GOOGLE_API_KEY = 'AIzaSyAWQ71nGZUwG-OeXUWdcWj6w1b1CbQ1BsU'

export function getMapPreview({lat, lng}){
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=S%7C${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imagePreviewUrl;
}


