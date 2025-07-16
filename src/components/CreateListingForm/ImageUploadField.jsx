import React from 'react';
import { Upload, X, Camera, ImageDown as ImageUp } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ImageUploadField = ({ maxPhotos, images, onImageUpload, error, isEventCategory, category }) => {

  const handleLocalImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const currentImageFiles = [...(images || [])]; 
    const currentImagePreviews = [...(images || [])];

    let uploadedCount = 0;

    files.forEach(file => {
      if (currentImagePreviews.length + uploadedCount >= maxPhotos) {
        toast({ title: "Limite atteinte", description: `Vous ne pouvez ajouter que ${maxPhotos} photos.`, variant: "warning", duration: 3000 });
        return;
      }
      if (file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) { 
          toast({ title: "Image trop lourde", description: `L'image ${file.name} dépasse 5MB. Veuillez compresser ou choisir une autre image.`, variant: "destructive", duration: 4000 });
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
          currentImagePreviews.push(event.target.result);
          currentImageFiles.push(file); 
          
          uploadedCount++;
          if (uploadedCount === files.filter(f => f.type.startsWith('image/') && f.size <= 5 * 1024 * 1024).length) {
             onImageUpload(currentImageFiles, currentImagePreviews);
          }
        };
        reader.readAsDataURL(file);

      } else {
        toast({ title: "Format invalide", description: `Le fichier ${file.name} n'est pas une image.`, variant: "destructive", duration: 3000 });
      }
    });
  };

  const removeImage = (indexToRemove) => {
    const updatedPreviews = images.filter((_, index) => index !== indexToRemove);
    
    const updatedFiles = [];
    let previewIndex = 0;
    images.forEach((imgPreview, originalIndex) => {
        if (originalIndex !== indexToRemove && imgPreview.startsWith('data:image')) {
            const fileIndex = images.slice(0, originalIndex).filter(p => p.startsWith('data:image')).length;
            if (images[fileIndex]) { 
                 updatedFiles.push(images[fileIndex]);
            }
        } else if (originalIndex !== indexToRemove && !imgPreview.startsWith('data:image')) {
            updatedFiles.push(images[originalIndex]);
        }
    });
    onImageUpload(updatedFiles, updatedPreviews);
  };


  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        <Camera className="inline w-5 h-5 mr-2 text-gray-600" />
        Photos {isEventCategory ? "de l'événement " : (category === 'seasonal-jobs' ? " (logo, lieu...)" : "")}
        (jusqu'à {maxPhotos}, la première sera la principale) 
        <span className="text-red-500">*</span>
      </label>
      <div className={`grid grid-cols-2 sm:grid-cols-3 ${maxPhotos > 5 ? 'md:grid-cols-5' : 'md:grid-cols-5'} gap-4 mb-3`}>
        {images && images.map((image, index) => (
          <div key={index} className="relative group aspect-w-1 aspect-h-1">
            <img 
              className="w-full h-full object-cover rounded-lg border border-gray-300 shadow-sm"
              alt={`Prévisualisation ${index + 1}`}
              src={typeof image === 'string' ? image : URL.createObjectURL(image)} // Handles both data URLs and File objects if needed
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2.5 -right-2.5 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 shadow-md"
              aria-label="Supprimer l'image"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        
        {(!images || images.length < maxPhotos) && (
          <label htmlFor="imageUploadInput" className="aspect-w-1 aspect-h-1 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors duration-200 p-2">
            <ImageUp className="w-8 h-8 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500 text-center">Ajouter (Max 5Mo)</span>
            <input
              id="imageUploadInput"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleLocalImageUpload}
              className="hidden"
            />
          </label>
        )}
      </div>
      {error && <p className="text-red-600 text-xs">{error}</p>}
      <p className="text-xs text-gray-500">Formats: JPG, PNG, WEBP. Max 5MB/photo.</p>
    </div>
  );
};

export default ImageUploadField;