import { generateImage, getLayerFile } from './images';

export const getImageUrl = async (traits) => {
  const imageSrc = await generateImage({
    'background': getLayerFile(traits[0].value),
    'head': getLayerFile(traits[1].value),
    'skin': getLayerFile(traits[2].value),
    'eyes': getLayerFile(traits[3].value),
    'mouth': getLayerFile(traits[4].value),
    'outfit': getLayerFile(traits[5].value),
  });
  
  return imageSrc;
}