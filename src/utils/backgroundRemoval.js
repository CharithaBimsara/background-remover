/**
 * Removes background from an image using Remove.bg API
 * @param {string} imageUrl - Image URL or Data URL
 * @param {function} progressCallback - Optional progress update function
 * @returns {Promise<string>} - Result image Data URL (PNG with transparent background)
 */
export const removeBackground = async (imageUrl, progressCallback = null) => {
  try {
    if (progressCallback) progressCallback(0.1, 'Uploading to Remove.bg...');

    const apiKey = "77i7YWurRk3wxLQW2MfrMkd4";
    const url = "https://api.remove.bg/v1.0/removebg";

    // Fetch image as blob from imageUrl
    const imgResponse = await fetch(imageUrl);
    const imgBlob = await imgResponse.blob();
    const formData = new FormData();
    formData.append("image_file", imgBlob, "image.png");
    formData.append("size", "auto");

    if (progressCallback) progressCallback(0.5, 'Processing image...');

    const response = await fetch(url, {
      method: "POST",
      headers: { "X-Api-Key": apiKey },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Remove.bg API error:", errorText);
      throw new Error("Failed to remove background.");
    }

    const blob = await response.blob();

    if (progressCallback) progressCallback(0.9, 'Finalizing...');

    const resultUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });

    if (progressCallback) progressCallback(1.0, 'Complete');
    return resultUrl;

  } catch (error) {
    console.error("RemoveBackground Error:", error);
    throw error;
  }
};
