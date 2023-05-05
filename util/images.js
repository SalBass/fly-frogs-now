import mergeImages from 'merge-images';
import outline from '../public/static/6/6.png';

export function getLayerFile(value) {
  if(value === "Transparent" || value === "Plain" || value === "None") {
    return null;
  }
  return value.toLowerCase().replaceAll(" ", "_");
}

export function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], {type: mimeString});
  return blob;
}

export const generateImage = async (traits) => {
  try {
    let headImage, skinImage, mouthImage, outfitImage;
    const backgroundImage = await import(/* webpackMode: "lazy" */ `../public/static/1/${traits.background}.png`);
    if (traits.head) {
      headImage = await import(/* webpackMode: "lazy" */ `../public/static/2/${traits.head}.png`);
    }
    if (traits.skin) {
      skinImage = await import(/* webpackMode: "lazy" */ `../public/static/3/${traits.skin}.png`);
    }
    const eyesImage = await import(/* webpackMode: "lazy" */ `../public/static/4/${traits.eyes}.png`);
    if (traits.mouth) {
      mouthImage = await import(/* webpackMode: "lazy" */ `../public/static/5/${traits.mouth}.png`);
    }
    if (traits.outfit) {
      outfitImage = await import(/* webpackMode: "lazy" */ `../public/static/7/${traits.outfit}.png`);
    }

    const images = [backgroundImage.default];
    if (traits.head) {
      images.push(headImage.default);
    }
    if (traits.skin) {
      images.push(skinImage.default);
    }
    images.push(eyesImage.default);
    images.push(outline);
    if (traits.mouth) {
      images.push(mouthImage.default);
    }
    if (traits.outfit) {
      images.push(outfitImage.default);
    }

    const src = await mergeImages(images);
    return src;
  } catch (err) {
    console.log(err);
    return null;
  }
};